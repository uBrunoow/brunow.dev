import { Article, C, Code, H2, List, Note, P } from '@/components/site/Prose'

export const metadata = {
  title: 'Filas que falham bem: retry, dead-letter, circuit breaker e idempotência com Celery',
  description:
    'As decisões por trás de uma camada de eventos sobre a API de um ERP: o que tentar de novo, o que desistir, quando parar de chamar e como garantir que nada aconteça duas vezes.',
}

export default function Page() {
  return (
    <Article>
      <P>
        Integrar com um ERP parece simples até a primeira semana em produção. A API do outro lado fica lenta, limita
        requisições, cai no meio de um envio, e o webhook que deveria chegar uma vez chega duas. Nenhum desses
        problemas é raro: eles são o comportamento normal de um sistema que você não controla.
      </P>
      <P>
        Na Alva eu construí o <strong>Alva Hub</strong>, a camada de eventos que fica entre os nossos sistemas e a API
        do Omie. Este artigo conta as decisões que tomei ali, sem números internos, com exemplos em Python e Celery que
        servem para qualquer integração parecida.
      </P>

      <H2>Primeiro, persista a intenção</H2>
      <P>
        A regra que organiza todo o resto: nenhuma chamada externa sai direto de uma view ou de um signal. Antes, ela vira
        uma linha no banco, um <strong>evento de integração</strong> com o tipo da operação, o payload, o status e o
        histórico de tentativas. Só depois uma task do Celery pega esse evento e executa.
      </P>
      <Code
        title="models.py · simplificado"
        code={`
class IntegrationEvent(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending"
        RUNNING = "running"
        DONE = "done"
        FAILED = "failed"   # vai tentar de novo
        DEAD = "dead"       # desistiu, precisa de alguém

    kind = models.CharField(max_length=60)          # ex.: "order.create"
    account = models.CharField(max_length=40)       # conta do ERP
    idempotency_key = models.CharField(max_length=120, unique=True)
    payload = models.JSONField()
    status = models.CharField(max_length=10, choices=Status, default=Status.PENDING)
    attempts = models.PositiveSmallIntegerField(default=0)
    last_error = models.TextField(blank=True)
    next_run_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
`}
      />
      <P>
        Parece burocracia, mas é o que torna o resto possível. Se o worker morrer no meio, o evento continua lá. Se
        alguém perguntar por que o pedido não chegou no ERP, a resposta está numa tabela, não espalhada em logs.
      </P>

      <H2>Idempotência: a mesma coisa duas vezes não pode virar duas coisas</H2>
      <P>
        Retry e webhook duplicado têm a mesma consequência: a mesma operação chega mais de uma vez. A defesa é uma chave
        de idempotência derivada do conteúdo, com <C>unique=True</C> no banco. Quem tenta criar o mesmo evento de novo
        recebe o que já existe.
      </P>
      <Code
        title="events.py · simplificado"
        code={`
def idempotency_key(kind: str, entity_id: str, payload: dict) -> str:
    body = json.dumps(payload, sort_keys=True, default=str)
    digest = hashlib.sha256(body.encode()).hexdigest()[:16]
    return f"{kind}:{entity_id}:{digest}"


def enqueue(kind: str, account: str, entity_id: str, payload: dict) -> IntegrationEvent:
    event, created = IntegrationEvent.objects.get_or_create(
        idempotency_key=idempotency_key(kind, entity_id, payload),
        defaults={"kind": kind, "account": account, "payload": payload},
    )
    if created:
        transaction.on_commit(lambda: run_event.delay(event.pk))
    return event
`}
      />
      <P>
        Dois detalhes importam aqui. O hash inclui o payload, então uma alteração real no pedido gera um evento novo, e
        uma repetição idêntica não. E a task só é disparada no <C>on_commit</C>: se a transação que criou o pedido for
        desfeita, nada sai para o ERP.
      </P>

      <H2>Retry só para o que pode dar certo da próxima vez</H2>
      <P>
        Tentar de novo um erro de validação é desperdício: o ERP vai recusar o mesmo payload para sempre. Por isso a
        primeira coisa que a task faz com um erro é classificá-lo.
      </P>
      <List
        items={[
          <>
            <strong>Transitório</strong>: timeout, erro 5xx, limite de requisições. Vale tentar de novo, mais tarde.
          </>,
          <>
            <strong>Permanente</strong>: dado inválido, cadastro inexistente, regra de negócio do ERP. Vai direto para
            dead-letter, com a mensagem do ERP guardada.
          </>,
        ]}
      />
      <Code
        title="tasks.py · simplificado"
        code={`
MAX_ATTEMPTS = 6
Status = IntegrationEvent.Status

@shared_task
def run_event(event_id: int):
    # o UPDATE condicional é atômico: só um worker consegue "pegar" o evento
    claimed = IntegrationEvent.objects.filter(
        pk=event_id, status__in=[Status.PENDING, Status.FAILED]
    ).update(status=Status.RUNNING)
    if not claimed:
        return
    event = IntegrationEvent.objects.get(pk=event_id)

    try:
        handlers[event.kind](event.account, event.payload)
    except TransientError as exc:
        schedule_retry(event, exc)
    except Exception as exc:
        mark_dead(event, exc)
    else:
        event.status = Status.DONE
        event.save(update_fields=["status"])


def schedule_retry(event, exc):
    event.attempts += 1
    if event.attempts >= MAX_ATTEMPTS:
        return mark_dead(event, exc)
    # backoff exponencial com jitter: 30s, 1min, 2min, 4min... embaralhados
    delay = min(30 * 2 ** (event.attempts - 1), 3600) * random.uniform(0.8, 1.2)
    event.status = Status.FAILED
    event.last_error = str(exc)
    event.next_run_at = timezone.now() + timedelta(seconds=delay)
    event.save()
    run_event.apply_async((event.pk,), countdown=delay)
`}
      />
      <P>
        O jitter (o <C>random.uniform</C>) evita que cem eventos que falharam juntos voltem todos no mesmo segundo e
        derrubem a API de novo. É uma linha que parece enfeite e não é.
      </P>

      <H2>Dead-letter é uma tela, não um log</H2>
      <P>
        Quando um evento desiste, ele precisa ir para algum lugar onde uma pessoa veja. O Celery com Redis não tem
        dead-letter nativa, e eu nem queria: o status <C>dead</C> no próprio evento, com o erro do ERP, já é a fila de
        mortos. Em cima disso existe uma tela com filtro por tipo e conta, e um botão de <strong>reprocessar</strong>.
      </P>
      <P>
        Esse botão é a parte que mais muda o dia a dia. O time de operação corrige o cadastro no ERP, clica em reprocessar
        e segue. Ninguém precisa abrir um chamado para o desenvolvedor rodar um script.
      </P>

      <H2>Circuit breaker: pare de bater na porta fechada</H2>
      <P>
        Retry resolve a falha de uma chamada. Ele não resolve a API inteira fora do ar: aí cada evento tenta, falha,
        reagenda, e a fila vira uma máquina de gerar erro. O circuit breaker observa as falhas seguidas e, depois de um
        limite, <strong>abre o circuito</strong>: por um tempo, nenhuma chamada sai, e os eventos são apenas reagendados.
      </P>
      <Code
        title="breaker.py · simplificado"
        code={`
class Breaker:
    def __init__(self, name: str, threshold=5, cooldown=120):
        self.key = f"breaker:{name}"
        self.threshold, self.cooldown = threshold, cooldown

    def is_open(self) -> bool:
        return cache.get(f"{self.key}:open") is not None

    def record_failure(self):
        failures = cache.incr(f"{self.key}:failures", ignore_key_check=True)
        if failures >= self.threshold:
            cache.set(f"{self.key}:open", 1, timeout=self.cooldown)
            cache.delete(f"{self.key}:failures")

    def record_success(self):
        cache.delete(f"{self.key}:failures")
`}
      />
      <P>
        Quando o tempo de espera acaba, a próxima chamada funciona como teste (o estado que a literatura chama de
        half-open). Se der certo, o contador zera. Se falhar, o circuito abre de novo. O breaker é por conta do ERP, e
        isso leva à última decisão.
      </P>

      <H2>Uma fila por conta</H2>
      <P>
        Com mais de uma conta no ERP, uma fila única tem um defeito sério: se uma conta é bloqueada por excesso de
        requisições, os eventos dela ocupam os workers e atrasam todas as outras. A solução foi rotear cada conta para a
        sua própria fila no Celery, com o seu próprio breaker.
      </P>
      <Code
        title="roteamento · simplificado"
        code={`
run_event.apply_async((event.pk,), queue=f"erp.{event.account}")

# operações que dependem de ordem (ex.: ajustes fiscais) vão para uma
# fila serial, consumida por um worker com concurrency=1
run_event.apply_async((event.pk,), queue=f"erp.{event.account}.serial")
`}
      />
      <P>
        A fila serial resolve um problema diferente: algumas operações não podem rodar em paralelo, porque a segunda
        depende do resultado da primeira. Em vez de lock distribuído, um worker com <C>concurrency=1</C> consumindo
        aquela fila garante a ordem de um jeito que qualquer pessoa entende.
      </P>

      <H2>O que eu levaria para qualquer integração</H2>
      <List
        ordered
        items={[
          'Persistir o evento antes de chamar a API, e disparar a task só depois do commit.',
          'Chave de idempotência derivada do conteúdo, com unique no banco.',
          'Classificar o erro antes de decidir tentar de novo; backoff exponencial com jitter.',
          'Dead-letter visível para quem opera, com botão de reprocessar.',
          'Circuit breaker por dependência, para não transformar uma queda em avalanche.',
          'Filas isoladas por conta e uma fila serial para o que depende de ordem.',
        ]}
      />
      <Note>
        Nenhuma dessas peças é nova; todas estão em qualquer livro de sistemas distribuídos. O trabalho foi escolher
        quais usar e deixar o comportamento delas visível para quem não é desenvolvedor.
      </Note>
    </Article>
  )
}
