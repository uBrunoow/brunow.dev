import { Article, C, Code, H2, List, Note, P } from '@/components/site/Prose'
import { postMetadata } from '@/lib/seo'
import { PostJsonLd } from '@/lib/structured-data'

export const generateMetadata = postMetadata('batalha-de-assobios-pitch-tempo-real')

export default function Page() {
  return (
    <Article>
      <PostJsonLd slug="batalha-de-assobios-pitch-tempo-real" />
      <P>
        O <a href="https://x1biu.vercel.app" target="_blank" rel="noopener noreferrer">x1biu</a> é um projeto
        declaradamente inútil: uma batalha 1 contra 1 de assobios. Dois jogadores entram na fila, são pareados, a mesma
        música toca para os dois e cada um assobia acompanhando a melodia. Quem assobiar mais afinado vence e sobe no
        ranking.
      </P>
      <P>
        Inútil, mas cheio de problema bom de resolver: captar áudio no navegador, descobrir qual nota a pessoa está
        assobiando, comparar com a música enquanto ela toca e mostrar a pontuação dos dois ao vivo. Este artigo passa por
        cada parte.
      </P>

      <H2>O caminho de uma partida</H2>
      <List
        ordered
        items={[
          'Os dois jogadores entram numa fila. Uma tarefa periódica do Celery Beat pareia os dois primeiros a cada poucos segundos.',
          'A partida é criada e os dois navegadores se conectam a um WebSocket do Django Channels.',
          'A música começa ao mesmo tempo para os dois.',
          'Cada navegador detecta o pitch do assobio e manda um frame por vez para o servidor.',
          'O servidor compara cada frame com a referência da música, soma pontos e devolve a pontuação para os dois.',
          'Quando a música termina, o vencedor é definido e o ranking é atualizado.',
        ]}
      />

      <H2>Ouvindo o microfone</H2>
      <P>
        A Web Audio API faz quase todo o trabalho pesado. O <C>getUserMedia</C> pede o microfone, um{' '}
        <C>AnalyserNode</C> expõe as amostras de áudio, e um loop com <C>requestAnimationFrame</C> lê um bloco de
        amostras a cada quadro de tela.
      </P>
      <Code
        title="usePitchDetection.ts"
        code={`
const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
const ctx = new AudioContext()
const analyser = ctx.createAnalyser()
analyser.fftSize = 2048
ctx.createMediaStreamSource(stream).connect(analyser)

const buffer = new Float32Array(analyser.fftSize)
function loop() {
  analyser.getFloatTimeDomainData(buffer)
  setHz(detectPitchHz(buffer, ctx.sampleRate))
  rafRef.current = requestAnimationFrame(loop)
}
loop()
`}
      />

      <H2>Encontrando a nota por autocorrelação</H2>
      <P>
        Um som afinado é periódico: a onda se repete. A ideia da autocorrelação é comparar o sinal com uma cópia dele
        mesmo deslocada no tempo. Quando o deslocamento coincide com o período da onda, as duas cópias quase se sobrepõem.
        Achou esse deslocamento, achou a frequência: <C>frequência = taxa de amostragem / deslocamento</C>.
      </P>
      <Code
        title="detectPitchHz"
        code={`
function detectPitchHz(buffer: Float32Array, sampleRate: number): number | null {
  // descarta frames silenciosos pelo volume médio (RMS)
  let rms = 0
  for (let i = 0; i < buffer.length; i++) rms += buffer[i] * buffer[i]
  if (Math.sqrt(rms / buffer.length) < 0.015) return null

  const half = Math.floor(buffer.length / 2)
  let bestOffset = -1, bestCorr = 0, lastCorr = 1, foundGood = false

  for (let offset = 1; offset < half; offset++) {
    let corr = 0
    for (let i = 0; i < half; i++) corr += Math.abs(buffer[i] - buffer[i + offset])
    corr = 1 - corr / half

    if (corr > 0.9 && corr > lastCorr) {
      foundGood = true
      if (corr > bestCorr) { bestCorr = corr; bestOffset = offset }
    } else if (foundGood) {
      break // passou do pico: o melhor deslocamento já foi encontrado
    }
    lastCorr = corr
  }

  if (bestOffset === -1) return null
  const hz = sampleRate / bestOffset
  return hz >= 500 && hz <= 4000 ? hz : null // faixa realista de um assobio
}
`}
      />
      <P>Três decisões fazem essa função funcionar com gente de verdade, num quarto de verdade:</P>
      <List
        items={[
          <>
            <strong>Portão de silêncio</strong>: abaixo de um volume mínimo, o frame é ignorado. Sem isso, ruído de fundo
            vira nota.
          </>,
          <>
            <strong>Parar no primeiro pico</strong>: o sinal também se parece consigo mesmo em dois, três períodos. Parar
            depois do primeiro pico bom evita confundir a nota com uma oitava abaixo.
          </>,
          <>
            <strong>Faixa de assobio</strong>: assobio humano fica, em geral, entre 500 Hz e 4 kHz. Qualquer coisa fora
            disso é voz, ruído ou erro, e é descartada.
          </>,
        ]}
      />
      <Note>
        A função não usa nenhuma biblioteca. Para uma única nota limpa como o assobio, a autocorrelação simples resolve;
        para voz ou instrumentos com muitos harmônicos, algoritmos como YIN ou bibliotecas de pitch seriam mais robustos.
      </Note>

      <H2>Pontuando em cents, não em hertz</H2>
      <P>
        Comparar frequências em hertz não funciona, porque a percepção de altura é logarítmica: a distância entre 500 e
        550 Hz soa muito maior que entre 3000 e 3050 Hz. A medida certa é o <strong>cent</strong>, um centésimo de
        semitom; uma oitava tem 1200 cents.
      </P>
      <P>
        E tem um detalhe musical: quase ninguém assobia na mesma oitava da melodia. Um assobio a 588 Hz para uma
        referência de 147 Hz é a mesma nota, duas oitavas acima, e precisa pontuar. Por isso o servidor normaliza a razão
        para dentro de uma oitava antes de medir a distância.
      </P>
      <Code
        title="ScoringService · Python"
        code={`
def score_frame(self, player_hz: float, frame_index: int) -> int:
    ref_hz = self._ref.get(frame_index)
    if not ref_hz or player_hz <= 0:
        return 0

    # traz a razão para dentro de uma oitava: mesma nota em outra oitava pontua
    ratio = player_hz / ref_hz
    while ratio >= 2.0:
        ratio /= 2.0
    while ratio < 0.5:
        ratio *= 2.0

    cents = abs(1200 * math.log2(ratio))
    if cents >= 150:
        return 0
    return round(100 - cents * 100 / 150)  # 100 pontos afinado, 0 a um semitom e meio
`}
      />

      <H2>Tempo real com Django Channels</H2>
      <P>
        Cada navegador envia um <C>pitch_frame</C> pelo WebSocket. O consumer do Channels guarda o frame num buffer,
        repassa o pitch para o grupo da partida (assim cada jogador vê a linha do adversário), calcula os pontos e
        transmite a pontuação nova para os dois.
      </P>
      <Code
        title="MatchConsumer · Django Channels"
        code={`
async def _handle_pitch_frame(self, data: dict):
    hz = float(data.get("hz", 0))
    frame = int(data.get("frame", 0))
    if hz > 0:
        self._pitch_buffer.append({"frame": frame, "hz": round(hz, 1)})

    await self.channel_layer.group_send(
        f"match_{self.match_id}",
        {"type": "pitch.update", "player_id": self.user_id, "hz": hz},
    )

    new_score = await sync_to_async(self._score_and_update)(hz, frame)
    if new_score is not None:
        await self.channel_layer.group_send(
            f"match_{self.match_id}",
            {"type": "score.update", "player_id": self.user_id, "score": new_score},
        )
`}
      />
      <P>
        Dois cuidados aqui. A soma dos pontos usa <C>F(&quot;score&quot;) + points</C> no banco, para que frames
        concorrentes não sobrescrevam um ao outro. E o buffer de pitch só é gravado no fim da partida ou na desconexão,
        uma escrita só em vez de uma por frame; é esse histórico que desenha o gráfico da partida depois.
      </P>

      <H2>O que um projeto inútil ensina</H2>
      <List
        items={[
          'Processamento de sinal no navegador é acessível: a Web Audio API entrega as amostras prontas.',
          'Medir na unidade certa (cents) muda o resultado mais do que um algoritmo mais sofisticado.',
          'Tempo real é sobre o que mandar a cada frame e o que gravar só no final.',
          'Projeto divertido é o melhor lugar para testar uma stack nova sem pressão de prazo.',
        ]}
      />
    </Article>
  )
}
