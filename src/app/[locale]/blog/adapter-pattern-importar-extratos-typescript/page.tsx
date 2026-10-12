import Link from 'next/link'
import type { ReactNode } from 'react'
import { postMetadata } from '@/lib/seo'
import { PostJsonLd } from '@/lib/structured-data'

export const generateMetadata = postMetadata('adapter-pattern-importar-extratos-typescript')


const CodeBlock = ({ title, code }: { title: string; code: string }) => (
  <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
    <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
      {title}
    </div>
    <pre className="p-3 text-sm">
      <code className="language-ts">{code}</code>
    </pre>
  </div>
)

const Inline = ({ children }: { children: ReactNode }) => (
  <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm">{children}</code>
)

const AdapterPatternPage = () => {
  return (
    <section className="container space-y-5 py-[150px]" lang="pt-BR">
      <PostJsonLd slug="adapter-pattern-importar-extratos-typescript" />
      <div>
        Todo sistema financeiro chega no mesmo ponto: o usuário quer importar o
        extrato do banco. Um banco exporta{' '}
        <span className="font-semibold">OFX</span>, outro manda uma{' '}
        <span className="font-semibold">planilha Excel</span>, e o terceiro só
        oferece <span className="font-semibold">PDF</span>. A transação é a
        mesma, mas cada arquivo descreve ela de um jeito diferente.
      </div>
      <div>
        Neste artigo eu mostro como o{' '}
        <span className="font-semibold">Adapter</span>, um padrão estrutural do
        catálogo GoF (Gang of Four), resolve esse problema com uma ideia
        simples: o sistema define{' '}
        <span className="font-semibold">um contrato</span>, e cada formato ganha
        um tradutor que cumpre esse contrato. As regras de negócio não precisam
        saber de onde a transação veio.
      </div>
      <div className="text-zinc-600">
        Este conteúdo nasceu de uma apresentação que fiz na faculdade (TADS,
        UDESC) sobre padrões de projeto.
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">O problema</h2>
      </div>
      <div>
        Olha como a mesma saída de R$ 150,00 aparece em cada formato:
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>
          <span className="font-semibold">OFX</span>:{' '}
          <Inline>TRNAMT: -150.00</Inline>. O sinal indica se é débito ou
          crédito.
        </li>
        <li>
          <span className="font-semibold">Excel</span>:{' '}
          <Inline>Valor: 150,00</Inline> e uma coluna{' '}
          <Inline>Tipo: Débito</Inline>. Cabeçalhos próprios e vírgula decimal.
        </li>
        <li>
          <span className="font-semibold">PDF</span>:{' '}
          <Inline>PAGAMENTO FORNECEDOR -150,00</Inline>. Texto livre que
          precisa ser extraído.
        </li>
      </ul>
      <div>
        Sem um padrão, o serviço de importação vira uma sequência de{' '}
        <Inline>if/else</Inline> por formato. Pior: cada formato novo obriga a
        mexer nas regras centrais do sistema, justamente o código que deveria
        ser o mais estável.
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">O conceito</h2>
      </div>
      <div>
        O Adapter faz uma interface incompatível funcionar onde o sistema espera
        outra. São quatro peças:
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>
          <span className="font-semibold">Client</span>: quem usa o resultado.
          Aqui, o <Inline>TransactionImportService</Inline>.
        </li>
        <li>
          <span className="font-semibold">Target</span>: o contrato que o
          sistema entende. Aqui, a interface{' '}
          <Inline>TransactionFileAdapter</Inline>.
        </li>
        <li>
          <span className="font-semibold">Adapter</span>: o tradutor.{' '}
          <Inline>OfxAdapter</Inline>, <Inline>ExcelAdapter</Inline> e{' '}
          <Inline>PdfAdapter</Inline>.
        </li>
        <li>
          <span className="font-semibold">Adaptee</span>: o que tem formato
          próprio. Os arquivos e seus parsers.
        </li>
      </ul>
      <div>
        O Client usa o Target, o Adapter cumpre o Target e traduz o Adaptee.
        Todo formato termina no mesmo lugar: uma lista de{' '}
        <Inline>Transaction</Inline>.
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          1. Defina o que o sistema entende
        </h2>
      </div>
      <div>
        Antes de qualquer adaptador, vem o modelo de domínio. Repare que ele não
        menciona OFX, Excel nem PDF.
      </div>
      <CodeBlock
        title="transaction.ts"
        code={`type TransactionType = "CREDIT" | "DEBIT";

interface Transaction {
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  externalId?: string;
}`}
      />
      <div>
        Uma decisão importante: <Inline>amount</Inline> guarda sempre o{' '}
        <span className="font-semibold">valor absoluto</span>, e{' '}
        <Inline>type</Inline> diz se é crédito ou débito. Isso é uma convenção
        do domínio, não do padrão, mas é ela que permite que três formatos tão
        diferentes produzam exatamente o mesmo objeto.
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          2. Defina a regra que todo adaptador cumpre
        </h2>
      </div>
      <CodeBlock
        title="transaction-file-adapter.ts (Target)"
        code={`interface TransactionFileAdapter {
  parse(content: Buffer): Promise<Transaction[]>;
}`}
      />
      <div>
        É o contrato inteiro: recebe o conteúdo do arquivo e devolve transações
        normalizadas. Qualquer coisa que cumpra isso pode ser importada.
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">3. Um adaptador por formato</h2>
      </div>
      <div>
        O adaptador de OFX mapeia campo a campo:{' '}
        <Inline>DTPOSTED → date</Inline>, <Inline>MEMO → description</Inline>,{' '}
        <Inline>TRNAMT → amount</Inline>, o sinal de <Inline>TRNAMT</Inline>{' '}
        vira <Inline>type</Inline>, e <Inline>FITID → externalId</Inline>.
      </div>
      <CodeBlock
        title="ofx.adapter.ts"
        code={`class OfxAdapter implements TransactionFileAdapter {
  async parse(content: Buffer): Promise<Transaction[]> {
    const entries = await parseOfxFile(content);

    return entries.map((entry) => ({
      date: normalizeOfxDate(entry.DTPOSTED),
      description: entry.MEMO,
      amount: Math.abs(Number(entry.TRNAMT)),
      type: Number(entry.TRNAMT) < 0 ? "DEBIT" : "CREDIT",
      externalId: entry.FITID,
    }));
  }
}`}
      />
      <div>
        O de Excel lê as colunas da planilha e trata a vírgula decimal:
      </div>
      <CodeBlock
        title="excel.adapter.ts"
        code={`class ExcelAdapter implements TransactionFileAdapter {
  async parse(content: Buffer): Promise<Transaction[]> {
    const rows = await parseExcelFile(content);

    return rows.map((row) => ({
      date: normalizeExcelDate(row["Data"]),
      description: row["Histórico"],
      amount: Math.abs(parseMoney(row["Valor"])),
      type: normalizeTransactionType(row["Tipo"]),
    }));
  }
}`}
      />
      <div>
        E o de PDF primeiro extrai o texto e depois interpreta as linhas do
        extrato:
      </div>
      <CodeBlock
        title="pdf.adapter.ts"
        code={`class PdfAdapter implements TransactionFileAdapter {
  async parse(content: Buffer): Promise<Transaction[]> {
    const text = await extractPdfText(content);
    const entries = parseStatementLines(text);

    return entries.map((entry) => ({
      date: normalizePdfDate(entry.date),
      description: entry.description,
      amount: Math.abs(parseMoney(entry.amount)),
      type: parseMoney(entry.amount) < 0 ? "DEBIT" : "CREDIT",
    }));
  }
}`}
      />
      <div>
        Três entradas completamente diferentes,{' '}
        <span className="font-semibold">a mesma saída</span>:{' '}
        <Inline>Transaction[]</Inline>.
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          4. Um serviço que não conhece arquivos
        </h2>
      </div>
      <div>
        Validação, deduplicação e persistência ficam no serviço, fora dos
        adaptadores. O detalhe que faz tudo funcionar: ele recebe a{' '}
        <span className="font-semibold">interface</span>, não uma classe
        concreta. Por isso aceita qualquer adaptador.
      </div>
      <CodeBlock
        title="transaction-import-service.ts"
        code={`class TransactionImportService {
  async import(
    content: Buffer,
    adapter: TransactionFileAdapter,
  ): Promise<Transaction[]> {
    const transactions = await adapter.parse(content);
    this.validate(transactions);
    // deduplicação, regras de negócio, persistência
    return transactions;
  }
}`}
      />

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">5. Escolhendo o adaptador</h2>
      </div>
      <div>
        Para selecionar o adaptador pela extensão do arquivo, um objeto simples
        resolve. Não é preciso uma Factory completa:
      </div>
      <CodeBlock
        title="adapter-resolver.ts"
        code={`const adapters: Record<string, TransactionFileAdapter> = {
  ofx: new OfxAdapter(),
  xlsx: new ExcelAdapter(),
  pdf: new PdfAdapter(),
};`}
      />
      <CodeBlock
        title="import-file.ts"
        code={`async function importFile(ext: string, content: Buffer) {
  const adapter = adapters[ext.toLowerCase()];

  if (!adapter) {
    throw new Error("Formato não suportado");
  }

  const service = new TransactionImportService();
  return service.import(content, adapter);
}`}
      />
      <CodeBlock
        title="terminal"
        code={`$ importFile("ofx", ofxBuffer)
✓ OfxAdapter → Transaction[]

$ importFile("xlsx", excelBuffer)
✓ ExcelAdapter → Transaction[]

$ importFile("csv", csvBuffer)
✗ Error: Formato não suportado`}
      />
      <div>
        E aqui está o ganho real: para aceitar CSV, basta criar um{' '}
        <Inline>CsvAdapter</Inline> e registrar no mapa{' '}
        <Inline>adapters</Inline>. O serviço, a validação e as regras de
        negócio não mudam uma linha.
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">O fluxo completo</h2>
      </div>
      <ol className="ml-2 list-inside list-decimal text-zinc-600">
        <li>Upload e validação do arquivo</li>
        <li>Resolver o adaptador pela extensão</li>
        <li>O adaptador traduz o formato</li>
        <li>Modelo normalizado (Transaction[])</li>
        <li>Validação, duplicidades e gravação no serviço</li>
      </ol>
      <div>Uma organização de pastas que deixa essas fronteiras claras:</div>
      <CodeBlock
        title="src/transactions/"
        code={`import/parsers/    → lê o arquivo (SheetJS, PDF.js...)
  ofx.parser.ts · excel.parser.ts · pdf.parser.ts
import/adapters/   → traduz cada formato para o modelo comum
  ofx.adapter.ts · excel.adapter.ts · pdf.adapter.ts
domain/            → validação, deduplicação e gravação
  transaction-import-service.ts`}
      />

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          Cuidados que fazem diferença em produção
        </h2>
      </div>
      <div>
        O Adapter só faz a tradução técnica. Os problemas reais de importação
        aparecem em outros lugares:
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>
          <span className="font-semibold">Duplicidades são regra do domínio</span>
          : use o <Inline>FITID</Inline> do OFX, mas deduplique no serviço,
          nunca no adaptador.
        </li>
        <li>
          <span className="font-semibold">Valores</span>: trabalhe com centavos
          inteiros ou uma biblioteca decimal. Ponto flutuante e dinheiro não
          combinam.
        </li>
        <li>
          <span className="font-semibold">Datas</span>: deixe explícitos o fuso
          horário e os formatos aceitos.
        </li>
        <li>
          <span className="font-semibold">PDFs</span>: a extração é frágil.
          Mostre ao usuário o que foi lido para ele revisar antes de gravar.
        </li>
        <li>
          <span className="font-semibold">Erros parciais</span>: diga quais
          linhas falharam e por quê, em vez de rejeitar o arquivo inteiro.
        </li>
        <li>
          <span className="font-semibold">Segurança</span>: valide o conteúdo
          real do arquivo (não só a extensão) e limite o tamanho.
        </li>
      </ul>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Adapter, Factory e Strategy</h2>
      </div>
      <div>
        Esses três padrões costumam aparecer juntos, e vale separar o papel de
        cada um:
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>
          <span className="font-semibold">Adapter</span>: converte um formato
          para o modelo comum. No projeto, os adaptadores de OFX, Excel e PDF.
        </li>
        <li>
          <span className="font-semibold">Factory</span>: cria ou seleciona o
          adaptador certo. No projeto, o mapa <Inline>adapters</Inline>.
        </li>
        <li>
          <span className="font-semibold">Strategy</span>: troca um algoritmo
          por outro. No projeto, as regras de duplicidade.
        </li>
      </ul>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Conclusão</h2>
      </div>
      <div>
        Uma interface, um adaptador por formato e um serviço que não sabe nada
        sobre arquivos. Com isso, o sistema aceita formatos novos sem que as
        regras centrais mudem.
      </div>
      <div>
        O Adapter não é sofisticado, e esse é o ponto. Ele coloca a sujeira de
        cada formato na borda do sistema, onde ela pode ser isolada e testada,
        e mantém o domínio falando uma língua só.
      </div>
      <div>
        Referências:{' '}
        <Link
          target="_blank"
          className="text-primary underline"
          href="https://refactoring.guru/pt-br/design-patterns/adapter"
        >
          Refactoring.Guru: Adapter
        </Link>{' '}
        |{' '}
        <Link
          target="_blank"
          className="text-primary underline"
          href="https://sheetjs.com/"
        >
          SheetJS
        </Link>{' '}
        |{' '}
        <Link
          target="_blank"
          className="text-primary underline"
          href="https://mozilla.github.io/pdf.js/"
        >
          PDF.js
        </Link>{' '}
        | Gamma et al., <em>Design Patterns</em> (1994)
      </div>
      <div>
        Se este artigo te ajudou, compartilhe com quem está lutando com
        importação de arquivos. Dúvidas ou comentários, é só me chamar! 🚀
      </div>
    </section>
  )
}

export default AdapterPatternPage
