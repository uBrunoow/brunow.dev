import { Article, C, Code, H2, List, Note, P } from '@/components/site/Prose'
import { postMetadata } from '@/lib/seo'
import { PostJsonLd } from '@/lib/structured-data'

export const generateMetadata = postMetadata('modelagem-postgresql-drizzle-ducktix')

export default function Page() {
  return (
    <Article>
      <PostJsonLd slug="modelagem-postgresql-drizzle-ducktix" />
      <P>
        O <a href="https://ducktix.vercel.app" target="_blank" rel="noopener noreferrer">Ducktix</a> é uma plataforma de
        venda de ingressos que construí para a disciplina de Banco de Dados II, no curso de Análise e Desenvolvimento de
        Sistemas da UDESC. A entrega pedia o caminho completo: modelo conceitual, modelo lógico, DDL e uma aplicação
        usando o banco de verdade. A aplicação é Next.js com Drizzle ORM sobre PostgreSQL.
      </P>
      <P>
        O que eu quero mostrar aqui não é o app, e sim uma ideia que o trabalho deixou clara para mim:{' '}
        <strong>a regra de negócio que não pode ser quebrada deve morar no banco</strong>, não só no código.
      </P>

      <H2>Convenções antes da primeira tabela</H2>
      <P>
        Antes de desenhar entidades, fixei algumas regras que valem para o esquema inteiro. Elas evitam discussão tabela a
        tabela e eliminam classes inteiras de bug.
      </P>
      <List
        items={[
          <>
            Chave primária <C>UUID</C> com <C>gen_random_uuid()</C>: ids que não vazam volume e podem ser gerados em
            qualquer lugar.
          </>,
          <>
            Dinheiro sempre em <strong>centavos</strong>, como <C>INTEGER</C>. Nunca <C>FLOAT</C>: 0,1 + 0,2 não é 0,3
            em ponto flutuante, e isso não é aceitável numa cobrança.
          </>,
          <>
            Datas em <C>TIMESTAMPTZ</C>. Um evento em Joinville comprado por alguém em outro fuso precisa começar no mesmo
            instante para os dois.
          </>,
          'Toda chave estrangeira com índice, porque o PostgreSQL não cria esse índice sozinho.',
          'Nomes de tabela no singular e em snake_case, em português, como o resto do domínio.',
        ]}
      />

      <H2>CHECK constraints são regras de negócio</H2>
      <P>
        Uma validação no formulário protege o formulário. Uma constraint protege o dado, venha ele da tela, de um script,
        de uma migração ou de um bug. O exemplo que eu mais gosto é o do evento, que tem três modalidades: presencial,
        online e híbrido.
      </P>
      <Code
        title="schema.sql"
        code={`
-- Evento online não tem local físico; presencial e híbrido exigem um.
CONSTRAINT ck_evento_local_por_modalidade CHECK (
  (modalidade = 'online'  AND local IS NULL)
  OR (modalidade <> 'online' AND local IS NOT NULL)
),
-- Online e híbrido precisam dizer como a parte online acontece.
CONSTRAINT ck_evento_formato_por_modalidade CHECK (
  (modalidade = 'presencial' AND formato_online IS NULL)
  OR (modalidade <> 'presencial' AND formato_online IS NOT NULL)
)
`}
      />
      <P>
        Com essas duas linhas, não existe no banco um evento online com endereço ou um evento híbrido sem formato. O
        código da aplicação pode errar; o dado não fica inconsistente.
      </P>
      <P>
        O Drizzle permite declarar as mesmas constraints no schema TypeScript, então o banco e o código descrevem as
        mesmas regras, e as migrações saem do mesmo lugar:
      </P>
      <Code
        title="schema.ts"
        code={`
export const lote = pgTable(
  'lote',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    eventoId: uuid('evento_id').notNull().references(() => evento.id, { onDelete: 'cascade' }),
    nome: varchar('nome', { length: 60 }).notNull(),
    precoCentavos: integer('preco_centavos').notNull(),
    vagas: integer('vagas').notNull(),
    vendidos: integer('vendidos').notNull().default(0),
  },
  (t) => [
    index('idx_lote_evento').on(t.eventoId),
    unique('uk_lote_nome').on(t.eventoId, t.nome),
    check('ck_lote_preco', sql\`\${t.precoCentavos} >= 0\`),
    // invariante central da venda: nunca vender mais do que existe
    check('ck_lote_estoque', sql\`\${t.vendidos} <= \${t.vagas}\`),
  ],
)
`}
      />

      <H2>Simplificar o modelo também é uma decisão</H2>
      <P>
        O primeiro rascunho tinha duas tabelas em cascata: lotes, e dentro de cada lote, tipos de ingresso (inteira,
        meia, VIP), cada um com preço e estoque. Quando fui implementar, percebi que o produto nunca usava os dois níveis.
        Um evento vende "Pista" e "Mezanino", ou "Lote 1" e "Lote 2", mas não as duas coisas ao mesmo tempo.
      </P>
      <P>
        Manter os dois níveis obrigaria toda venda a passar por uma tabela que quase sempre teria uma linha só, e pior,
        deixaria ambíguo onde o estoque mora. Juntei tudo numa tabela <C>lote</C>. Um nível só deixa claro onde fica o
        contador de vendidos, e esse é exatamente o ponto em que a concorrência acontece.
      </P>
      <Note>
        Documentei essa mudança com o motivo e com o caminho de volta (recriar a tabela de tipos e mover preço e vagas
        para ela), para poder defender a escolha na apresentação. Uma decisão de modelagem sem o porquê escrito vira
        dúvida seis meses depois.
      </Note>

      <H2>Dois compradores, uma vaga</H2>
      <P>
        O cenário que todo sistema de ingressos precisa resolver: resta uma vaga e duas pessoas confirmam o pedido no
        mesmo instante. Se as duas leem <C>vendidos = 99</C> com <C>vagas = 100</C>, as duas acham que podem comprar.
      </P>
      <P>
        A constraint <C>ck_lote_estoque</C> já impede que o banco aceite o estado errado, mas a aplicação precisa de uma
        resposta melhor que um erro de constraint. A solução é travar a linha do lote dentro da transação, com{' '}
        <C>SELECT ... FOR UPDATE</C>:
      </P>
      <Code
        title="drizzle-catalogo.ts"
        code={`
async registrarVenda(loteId: string, quantidade: number): Promise<void> {
  await db.transaction(async (tx) => {
    const [linha] = await tx
      .select({ vagas: loteTabela.vagas, vendidos: loteTabela.vendidos })
      .from(loteTabela)
      .where(eq(loteTabela.id, loteId))
      .for('update') // a segunda transação espera aqui

    if (!linha || linha.vendidos + quantidade > linha.vagas) {
      throw new Error('Estoque insuficiente para registrar a venda.')
    }

    await tx
      .update(loteTabela)
      .set({ vendidos: sql\`\${loteTabela.vendidos} + \${quantidade}\` })
      .where(eq(loteTabela.id, loteId))
  })
}
`}
      />
      <P>
        A segunda transação fica parada no <C>FOR UPDATE</C> até a primeira terminar. Quando ela finalmente lê a linha,
        já vê o valor atualizado e recebe a mensagem de estoque esgotado. Repare também no{' '}
        <C>vendidos + quantidade</C> calculado pelo banco, e não pelo JavaScript: o incremento usa o valor que está na
        linha travada.
      </P>

      <H2>O detalhe do banco serverless</H2>
      <P>
        Em produção o Ducktix usa o Neon, um PostgreSQL serverless. O driver HTTP do Neon é ótimo para consultas soltas,
        mas cada consulta é uma requisição independente, sem sessão. Sem sessão não existe transação interativa, e sem
        transação o <C>FOR UPDATE</C> não serve para nada.
      </P>
      <P>
        A saída foi usar o driver do Neon que abre conexão por WebSocket com um pool, que mantém a sessão durante a
        transação. É o tipo de detalhe que não aparece no tutorial e quebra exatamente a parte mais importante do sistema.
      </P>

      <H2>O que fica</H2>
      <List
        items={[
          'Convenções de esquema decididas antes das tabelas evitam bugs de dinheiro, fuso e performance.',
          'CHECK constraints transformam regra de negócio em garantia, não em sugestão.',
          'Simplificar o modelo é válido quando o motivo está escrito.',
          'Concorrência se resolve travando o ponto exato onde o estado muda.',
          'Confira se o driver do seu banco suporta as transações que o seu código assume.',
        ]}
      />
    </Article>
  )
}
