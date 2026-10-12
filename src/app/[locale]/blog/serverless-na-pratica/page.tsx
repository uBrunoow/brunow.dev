import { Article, Code, Compare, H2, List, Note, P } from '@/components/site/Prose'
import { Link } from '@/i18n/navigation'
import { postMetadata } from '@/lib/seo'
import { PostJsonLd } from '@/lib/structured-data'

export const generateMetadata = postMetadata('serverless-na-pratica')

export default function Page() {
  return (
    <Article>
      <PostJsonLd slug="serverless-na-pratica" />
      <P>
        Serverless é um nome ruim. Os servidores continuam existindo; a diferença é que não é você quem cuida deles. Você
        entrega uma função, diz o que deve disparar essa função, e o provedor de nuvem se encarrega de provisionar,
        escalar, monitorar e desligar a máquina.
      </P>
      <P>
        Este texto nasceu de um seminário que apresentei em grupo na disciplina de Engenharia de Software, no curso de
        Análise e Desenvolvimento de Sistemas da UDESC. O deck está em{' '}
        <a href="https://serverless-soft.vercel.app" target="_blank" rel="noopener noreferrer">
          serverless-soft.vercel.app
        </a>
        . Aqui eu organizo o conteúdo em formato de artigo e acrescento o que aprendi usando isso fora da sala.
      </P>

      <H2>As peças</H2>
      <List
        items={[
          <>
            <strong>Evento</strong>: o que dispara a execução. Uma requisição HTTP, um arquivo enviado, uma mensagem numa
            fila, um horário agendado.
          </>,
          <>
            <strong>API Gateway</strong>: a porta de entrada HTTP. Recebe a requisição, autentica e encaminha para a
            função certa.
          </>,
          <>
            <strong>Função</strong>: a lógica de negócio. Pequena, isolada e <strong>sem estado</strong>.
          </>,
          <>
            <strong>Banco e armazenamento</strong>: onde o estado mora, já que a função não guarda nada entre uma execução
            e outra. O armazenamento também pode gerar eventos.
          </>,
          <>
            <strong>Provedor</strong>: provisiona, escala, monitora e mantém toda a infraestrutura.
          </>,
        ]}
      />

      <H2>Do evento até a resposta</H2>
      <P>
        Uma requisição passa por cinco etapas: o usuário envia, o gateway autentica e roteia, a função executa, lê ou grava
        no banco, e a resposta volta. A função só existe enquanto executa. Terminou o trabalho, o ambiente é liberado.
      </P>
      <P>
        A consequência mais interessante aparece com carga. Mil requisições simultâneas viram mil execuções em paralelo,
        sem nenhuma configuração de autoscaling. Num servidor tradicional, esse pico exigiria máquinas que passam o resto
        do dia ociosas.
      </P>

      <H2>Exemplo 1: miniatura a partir de um upload</H2>
      <P>
        O caso clássico. Uma imagem chega no S3, o S3 emite um evento, a Lambda gera a miniatura e grava o registro.
      </P>
      <Code
        title="thumbnail.py · AWS Lambda"
        code={`
def handler(event, context):
    info = event["Records"][0]["s3"]
    bucket, key = info["bucket"]["name"], info["object"]["key"]

    obj = s3.get_object(Bucket=bucket, Key=key)
    img = Image.open(io.BytesIO(obj["Body"].read()))
    img.thumbnail((200, 200))

    buf = io.BytesIO()
    img.save(buf, format="JPEG")

    # grava em OUTRO bucket: no mesmo, a miniatura dispararia a função de novo
    s3.put_object(Bucket="miniaturas", Key=key, Body=buf.getvalue())
    tabela.put_item(Item={"arquivo": key})
`}
      />
      <Note>
        O comentário sobre o outro bucket é a lição mais cara desse exemplo. Uma função que escreve no mesmo bucket que a
        dispara entra em loop, e em serverless loop é cobrado por execução.
      </Note>

      <H2>Exemplo 2: um relatório que roda uma vez por dia</H2>
      <P>
        Uma regra do EventBridge dispara a função todo dia de manhã. A função consulta as vendas do dia anterior, monta o
        relatório e guarda no S3.
      </P>
      <Code
        title="relatorio.py · AWS Lambda"
        code={`
def handler(event, context):
    ontem = date.today() - timedelta(days=1)
    vendas = consulta_vendas(ontem)
    relatorio = {"data": str(ontem), "total": sum(v["valor"] for v in vendas)}

    s3.put_object(
        Bucket="relatorios",
        Key=f"vendas/{ontem}.json",
        Body=json.dumps(relatorio),
    )
`}
      />
      <Code
        title="regra de agendamento · EventBridge"
        code={`
cron(0 11 * * ? *)
# minutos horas dia mês dia-da-semana ano
# 11h UTC = 8h em Brasília
`}
      />
      <P>
        O código roda só nos minutos em que o trabalho acontece. Um servidor comum ficaria ligado 24 horas para trabalhar
        alguns minutos por dia. E repare no fuso: a expressão é em UTC, um erro fácil de cometer e chato de descobrir.
      </P>

      <H2>O que se ganha e o que se paga</H2>
      <Compare
        left={{
          title: 'Ganha',
          items: [
            'Menos infraestrutura para gerenciar',
            'Escala automática com a demanda',
            'Pagamento pelo uso, sem máquina ociosa',
            'Publicação rápida de funcionalidades',
          ],
        }}
        right={{
          title: 'Paga',
          items: [
            'Dependência do provedor',
            'Limites de tempo e memória por execução',
            'Cold start na primeira chamada',
            'Depuração difícil num sistema distribuído',
            'Custo que cresce com o volume',
          ],
        }}
      />
      <P>
        O <strong>cold start</strong> merece atenção. Quando a função não tem um ambiente pronto, o provedor precisa criar
        um antes de executar, e essa primeira chamada pode levar centenas de milissegundos a mais que as seguintes. Para
        um relatório diário, não importa. Para uma API que precisa responder rápido em toda requisição, importa muito.
      </P>

      <H2>Quando faz sentido</H2>
      <P>
        A pergunta não é se serverless é melhor. É em qual cenário as características dele ajudam.
      </P>
      <Compare
        left={{
          title: 'Indicado para',
          items: [
            'APIs e back-ends de apps com demanda irregular',
            'Processamento de arquivos e imagens',
            'Tarefas agendadas e automações',
            'Sistemas orientados a eventos',
          ],
        }}
        right={{
          title: 'Avalie outra opção quando',
          items: [
            'A aplicação precisa rodar continuamente',
            'A latência precisa ser baixa e previsível',
            'O processamento passa dos limites de execução',
            'A carga é alta e constante: um servidor dedicado sai mais barato',
          ],
        }}
      />
      <P>
        No meu trabalho, o padrão que mais uso é um meio-termo: a aplicação principal roda num servidor comum (Django,
        filas, banco) e as peças orientadas a evento, como upload de arquivo, ficam em serviços gerenciados como o S3.
        Um caso parecido aparece no{' '}
        <Link href="/blog/modelagem-postgresql-drizzle-ducktix">artigo sobre o Ducktix</Link>, onde o banco serverless exigiu um
        driver diferente para conseguir abrir transações.
      </P>

      <H2>Resumo</H2>
      <P>
        Serverless troca controle de infraestrutura por agilidade e escala automática. O provedor cuida do servidor; o
        time cuida do código. Resolve ociosidade, picos e provisionamento manual. Cold start, limites de execução e
        dependência do provedor continuam pesando. É uma escolha de cenário, não um upgrade universal.
      </P>
      <P>
        Para aprofundar: a página de{' '}
        <a href="https://aws.amazon.com/serverless/" target="_blank" rel="noopener noreferrer">
          computação sem servidor da AWS
        </a>{' '}
        e a documentação sobre o{' '}
        <a
          href="https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          ciclo de vida do ambiente de execução da Lambda
        </a>
        , que explica o cold start em detalhe.
      </P>
    </Article>
  )
}
