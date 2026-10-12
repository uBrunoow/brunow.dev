import { Article, H2, List, Note, P } from '@/components/site/Prose'

export const metadata = {
  title: 'Uma plataforma não é uma educação: notas sobre EaD no Brasil',
  description:
    'Do curso por correspondência às plataformas digitais: o que a pesquisa para um seminário na UDESC me mostrou sobre educação a distância, e o que isso diz para quem constrói software.',
}

export default function Page() {
  return (
    <Article>
      <P>
        Este é um texto diferente dos outros do blog. Não tem código. Ele nasceu de um seminário sobre educação a
        distância que apresentei em grupo na disciplina de Informática na Educação, no curso de Análise e Desenvolvimento
        de Sistemas da UDESC. O deck está em{' '}
        <a href="https://educacao-a-distancia.vercel.app" target="_blank" rel="noopener noreferrer">
          educacao-a-distancia.vercel.app
        </a>
        .
      </P>
      <P>
        Escrevo sobre isso aqui porque a pesquisa mudou a forma como eu penso sobre sistemas, e não só sobre educação.
      </P>

      <H2>O que é EaD, de fato</H2>
      <P>
        Educação a distância é o ensino em que professor e aluno estão separados no espaço e no tempo, com a tecnologia
        fazendo a mediação. A literatura costuma descrever a experiência por quatro características:
      </P>
      <List
        items={[
          <>
            <strong>Distância mediada</strong>: a tecnologia é o canal entre quem ensina e quem aprende.
          </>,
          <>
            <strong>Autonomia</strong>: o estudo é auto-organizado.
          </>,
          <>
            <strong>Interatividade</strong>: o estudante participa, critica e colabora, não só recebe.
          </>,
          <>
            <strong>Flexibilidade</strong>: estudo e trabalho convivem, cada um no seu ritmo.
          </>,
        ]}
      />

      <H2>Começou muito antes da internet</H2>
      <P>
        A primeira surpresa da pesquisa: EaD não é filha da internet. Os registros mais citados começam no século XVIII,
        com cursos por correspondência. Depois vieram o rádio e a televisão, e no Brasil isso teve nome próprio, de
        emissoras educativas dos anos 1920 aos telecursos dos anos 1970.
      </P>
      <P>
        É comum dividir essa história em três gerações: impresso e correio, rádio e televisão, e redes digitais. A
        mudança mais importante entre elas não foi o canal. Foi a direção da comunicação. Nas duas primeiras, o conteúdo
        ia do curso para o aluno, em mão única. Na terceira, o aluno conversa com a plataforma, com o professor e com
        outros alunos.
      </P>

      <H2>Regras para a educação digital</H2>
      <P>
        No Brasil, a base legal veio com o artigo 80 da Lei de Diretrizes e Bases da Educação (Lei nº 9.394, de 1996),
        que reconheceu a EaD e criou a exigência de regulação e supervisão. Decretos e normas do MEC detalharam depois o
        que um curso precisa ter: concepção pedagógica, material didático, avaliação da aprendizagem, corpo docente
        acompanhado, equipe multidisciplinar e infraestrutura de apoio.
      </P>

      <H2>Uma plataforma não é uma educação</H2>
      <P>
        Essa foi a frase central do nosso seminário, e é a que eu levo para o meu trabalho. A qualidade de um curso a
        distância vem de três frentes combinadas, e nenhuma basta sozinha:
      </P>
      <List
        items={[
          <>
            <strong>Pedagogia</strong>: a concepção que sustenta o curso e o material.
          </>,
          <>
            <strong>Equipe</strong>: professores e tutores acompanhando, e uma avaliação que mede aprendizagem.
          </>,
          <>
            <strong>Tecnologia</strong>: o ambiente virtual e a infraestrutura.
          </>,
        ]}
      />
      <P>
        Como desenvolvedor, é tentador achar que a terceira frente resolve as outras duas. Não resolve. Um ambiente
        virtual impecável com material fraco e sem tutoria é só uma vitrine bem-feita para conteúdo que ninguém termina.
      </P>

      <H2>Acesso não garante permanência</H2>
      <P>
        O desafio que mais aparece na literatura é a evasão. Um dos estudos que usamos apontava instituições com evasão
        de 30% ou mais, com falta de tempo e dificuldade de adaptação à metodologia entre as causas mais citadas. O
        perfil mais afetado, segundo a mesma referência, é de quem estuda e trabalha ao mesmo tempo.
      </P>
      <P>
        Entrar num curso é fácil. O ponto crítico está entre estudar e concluir, e é exatamente aí que a tutoria decide:
        alguém que acompanha, orienta e percebe quando o aluno está sumindo.
      </P>
      <Note>
        A expansão recente da EaD no Brasil foi principalmente quantitativa, e concentrou a oferta em poucos cursos. A
        conclusão do nosso grupo foi que o próximo passo não é crescer, é amadurecer: consolidar as tecnologias digitais
        sem a visão emergencial, criar ambientes que formem comunidade entre os alunos e medir resultado formativo, e não
        número de vagas.
      </Note>

      <H2>O que isso tem a ver com software</H2>
      <P>
        Mais do que parece. O padrão se repete em qualquer sistema que eu construo: a ferramenta é a parte visível, mas o
        resultado depende do processo e das pessoas em volta dela. Um portal B2B não vende sozinho; um kanban de
        faturamento não organiza um time que não combinou as etapas.
      </P>
      <P>
        Software bom amplia um processo que já faz sentido. A pesquisa sobre EaD me deu uma frase para isso, e eu
        continuo usando: uma plataforma não é uma educação, e um sistema não é uma operação.
      </P>
      <P>
        As referências completas, com os artigos acadêmicos consultados e a própria LDB, estão no último slide do deck.
      </P>
    </Article>
  )
}
