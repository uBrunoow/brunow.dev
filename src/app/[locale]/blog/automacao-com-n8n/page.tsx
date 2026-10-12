import { Article, Code, Compare, H2, List, Note, P } from '@/components/site/Prose'
import { Link } from '@/i18n/navigation'
import { postMetadata } from '@/lib/seo'
import { PostJsonLd } from '@/lib/structured-data'

export const generateMetadata = postMetadata('automacao-com-n8n')

export default function Page() {
  return (
    <Article>
      <PostJsonLd slug="automacao-com-n8n" />
      <P>
        O n8n é uma plataforma de automação visual baseada em nós: você liga caixas que representam APIs, bancos de dados,
        serviços de mercado e modelos de IA, e o fluxo resultante roda sozinho. Apresentei a ferramenta em grupo na
        disciplina de Fundamentos de Sistemas de Informação, na UDESC, e uso o n8n no trabalho, em integrações com
        parceiros de logística.
      </P>
      <P>
        Este artigo junta as duas coisas: o que a ferramenta é, e o critério que eu uso para decidir quando ela é a
        resposta certa.
      </P>

      <H2>Gatilho, nó, ação</H2>
      <P>Todo fluxo no n8n tem a mesma anatomia em três partes.</P>
      <List
        items={[
          <>
            <strong>Gatilho</strong>: o evento que inicia o fluxo. Uma chamada de webhook, um e-mail recebido, uma linha
            nova numa planilha, um horário.
          </>,
          <>
            <strong>Nós</strong>: as etapas intermediárias. Consultas em banco, filtros, condicionais, transformações de
            dados, chamadas HTTP.
          </>,
          <>
            <strong>Ações</strong>: o resultado. Enviar uma mensagem, cadastrar um cliente, atualizar um registro.
          </>,
        ]}
      />
      <P>
        Um exemplo que usamos na apresentação: um cliente envia um e-mail, um nó de código classifica a mensagem, um nó
        de IA gera um rascunho de resposta, um nó de PostgreSQL grava o registro e um nó do Slack avisa o time. Cinco
        nós, nenhuma pessoa no meio.
      </P>

      <H2>O que diferencia o n8n</H2>
      <List
        items={[
          <>
            <strong>Self-hosting</strong>: a versão Community roda em Docker na sua infraestrutura, sem custo de licença,
            e os dados não saem da empresa. Existe também a versão Cloud, paga por execução.
          </>,
          <>
            <strong>Low-code e pro-code no mesmo lugar</strong>: quem não programa arrasta nós; quem programa escreve
            JavaScript ou Python dentro de um nó, sem sair do fluxo.
          </>,
          <>
            <strong>IA como nó</strong>: agentes, memória e bancos vetoriais entram no fluxo como qualquer outra etapa.
          </>,
          <>
            <strong>Histórico de execuções</strong>: cada execução fica registrada com a entrada e a saída de cada nó, e
            pode ser repetida.
          </>,
        ]}
      />

      <H2>Como eu uso no trabalho</H2>
      <P>
        Na Alva, o fluxo de faturamento do Alva Tools é um kanban que acompanha cada pedido até a expedição. Quando um
        pedido chega na etapa de separação, o back-end Django não fala direto com o sistema do operador logístico: ele
        chama um webhook do n8n, e o fluxo do n8n faz a conversa com o parceiro.
      </P>
      <Code
        title="exemplo simplificado · Django chamando o n8n"
        code={`
def solicitar_separacao(pedido: Pedido) -> None:
    payload = {
        "pedido_id": str(pedido.id),
        "numero": pedido.numero,
        "itens": [{"sku": i.sku, "quantidade": i.quantidade} for i in pedido.itens.all()],
    }
    resposta = requests.post(
        settings.N8N_SEPARACAO_WEBHOOK,
        json=payload,
        headers={"X-Idempotency-Key": f"separacao:{pedido.id}"},
        timeout=15,
    )
    resposta.raise_for_status()
    pedido.registrar_evento("separacao_solicitada", resposta.json())
`}
      />
      <P>
        A divisão de responsabilidade é deliberada. O Django é dono da regra de negócio: quando um pedido pode ir para a
        separação, o que acontece se falhar, o histórico. O n8n é dono da cola com o parceiro: formato do arquivo,
        autenticação, os detalhes que mudam quando o parceiro muda alguma coisa do lado dele.
      </P>

      <H2>Fluxo no n8n ou código no back-end?</H2>
      <P>Depois de algum tempo usando os dois, o critério ficou mais ou menos este:</P>
      <Compare
        left={{
          title: 'Vai para o n8n',
          items: [
            'Cola entre sistemas de terceiros',
            'Fluxos que mudam com frequência',
            'Notificações e tarefas agendadas simples',
            'Protótipos de automação antes de virar produto',
            'Coisas que alguém de operação deveria conseguir ler',
          ],
        }}
        right={{
          title: 'Fica no código',
          items: [
            'Regras de negócio centrais',
            'Qualquer coisa que precise de transação no banco',
            'Lógica que precisa de testes automatizados',
            'Volume alto ou latência crítica',
            'Dados sensíveis com regras de acesso finas',
          ],
        }}
      />

      <H2>Cuidados que ninguém conta no tutorial</H2>
      <List
        items={[
          <>
            <strong>Versione os fluxos</strong>. Um fluxo editado direto na tela não tem histórico de mudanças. Exporte o
            JSON e guarde no repositório junto com o código que chama o fluxo.
          </>,
          <>
            <strong>Configure um fluxo de erro</strong>. O n8n permite apontar um workflow que roda quando outro falha.
            Sem isso, falhas ficam silenciosas até alguém perguntar por que o pedido não andou.
          </>,
          <>
            <strong>Idempotência continua sendo sua</strong>. Se o back-end reenviar a chamada depois de um timeout, o
            fluxo vai rodar duas vezes. Por isso o exemplo acima manda uma chave de idempotência no cabeçalho.
          </>,
          <>
            <strong>Webhooks precisam de autenticação</strong>. Uma URL de webhook pública sem verificação é uma porta
            aberta para qualquer um disparar o fluxo.
          </>,
          <>
            <strong>Credenciais ficam no n8n, não nos nós</strong>. Use o cofre de credenciais da ferramenta em vez de
            colar tokens em nós de código.
          </>,
        ]}
      />
      <Note>
        O n8n não substitui o back-end; ele tira do back-end o trabalho que não precisava estar lá. Usado assim, o código
        fica menor e a integração com cada parceiro vira algo que dá para olhar e entender numa tela.
      </Note>
      <P>
        Se você quer ver o outro lado dessa história, as filas e o reprocessamento que ficam no código, escrevi sobre isso
        em <Link href="/blog/filas-que-falham-bem-celery">Filas que falham bem</Link>, também aqui no blog.
      </P>
    </Article>
  )
}
