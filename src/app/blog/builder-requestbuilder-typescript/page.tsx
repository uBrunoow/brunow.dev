import Link from 'next/link'

const BuilderRequestBuilderTypescriptPage = () => {
  return (
    <section className="container space-y-5 py-[150px]">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          Using the Builder Pattern to create API calls with a RequestBuilder in
          TypeScript
        </h1>
        <p className="text-zinc-500">Jan 9, 2026</p>
      </div>
      <div>
        In modern applications — especially{' '}
        <span className="font-semibold">React / Next.js frontends</span> and{' '}
        <span className="font-semibold">BFF (Backend for Frontend)</span>{' '}
        architectures — the HTTP layer tends to grow with cross-cutting
        requirements: dynamic headers, authentication, token refresh, retries,
        timeouts, pagination, optional filters, idempotency, and observability.
      </div>
      <div>
        The problem is not making a request. The problem is keeping code{' '}
        <span className="font-semibold">readable</span> and{' '}
        <span className="font-semibold">evolvable</span> when “a simple GET
        call” turns into a set of decisions.
      </div>
      <div>
        In this article, I present a pragmatic approach using the{' '}
        <span className="font-semibold">Builder Pattern</span> to build HTTP
        requests via a <span className="font-semibold">RequestBuilder</span>{' '}
        (TypeScript), keeping a clear separation between:
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>
          <span className="font-semibold">Builder</span> (request construction)
        </li>
        <li>
          <span className="font-semibold">HTTP executor</span> (Axios,
          interceptors, retry, refresh)
        </li>
      </ul>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">The real problem</h1>
      </div>
      <div>
        The most common anti-pattern I see is centralizing everything into a
        single function with a long list of optional parameters.
      </div>
      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Anti-pattern
        </div>
        <pre className="p-3 text-sm">
          <code className="language-ts">{`await httpRequest('users', 'GET', {
  query: { page: 1, search: undefined },
  headers: { 'x-source': 'web' },
  timeoutMs: 8000,
  retries: 3,
  retryDelayMs: 200,
  refreshTokenOn401: true,
  baseURLOverride: process.env.EXTERNAL_API,
})`}</code>
        </pre>
      </div>
      <div>It works, but it quickly degrades in three ways:</div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>
          <span className="font-semibold">Unstable signatures</span>: every new
          feature becomes “just one more option”.
        </li>
        <li>
          <span className="font-semibold">Hard to read</span>: you need the
          whole contract in your head to use 10% of it.
        </li>
        <li>
          <span className="font-semibold">Cascade effect</span>: HTTP
          infrastructure changes leak into services and UI code.
        </li>
      </ul>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Builder Pattern (goal)</h1>
      </div>
      <div>
        The <span className="font-semibold">Builder</span> is a creational
        pattern that helps when you need to build a complex object step by step,
        with many option combinations and well-defined defaults.
      </div>
      <div>
        Applied to HTTP requests, the complex object is a{' '}
        <span className="font-semibold">RequestDescriptor</span>: URL, method,
        headers, query params, body, timeout, and execution metadata (retry,
        auth strategy, etc.).
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">When it makes sense</h1>
      </div>
      <div>
        This is not “pattern for pattern’s sake”. It pays off when you have{' '}
        <span className="font-semibold">combinatorial</span> complexity, not
        just volume.
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>
          Many optional knobs (headers, params, timeout, baseURL override)
        </li>
        <li>Cross-cutting concerns (auth, retry, refresh token, tracing)</li>
        <li>
          Need for standardization (every service builds URLs/params the same
          way)
        </li>
        <li>
          BFF projects or multiple integrations (internal + external APIs)
        </li>
      </ul>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">
          Solution architecture (Builder vs executor)
        </h1>
      </div>
      <div>
        The key architectural point is{' '}
        <span className="font-semibold">not coupling</span> the Builder to
        Axios. The Builder expresses intent; the HTTP layer executes.
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>
          <span className="font-semibold">RequestBuilder</span>: produces a
          typed `RequestDescriptor`.
        </li>
        <li>
          <span className="font-semibold">HttpClient</span>: applies
          interceptors (token), retry/refresh policies and executes
          `axios.request`.
        </li>
      </ul>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">RequestBuilder structure</h1>
      </div>
      <div>
        The base is a Builder with internal mutable state (expected for
        builders) and a fluent interface.
      </div>
      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          RequestBuilder.ts
        </div>
        <pre className="p-3 text-sm">
          <code className="language-ts">{`export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type QueryValue = string | number | boolean | null | undefined
export type QueryParams = Record<string, QueryValue>

export type HeadersMap = Record<string, string>

export interface RequestDescriptor<TResponse = unknown> {
  method: HttpMethod
  url: string
  headers: HeadersMap
  query: QueryParams
  body?: unknown
  timeoutMs?: number

  // Execution metadata (not Axios options directly)
  retries?: number
  requireAuth?: boolean
}

export class RequestBuilder<TResponse = unknown> {
  private descriptor: RequestDescriptor<TResponse>

  constructor() {
    this.descriptor = {
      method: 'GET',
      url: '',
      headers: {},
      query: {},
      retries: 0,
      requireAuth: true,
    }
  }

  setUrl(url: string) {
    this.descriptor.url = url
    return this
  }

  setMethod(method: HttpMethod) {
    this.descriptor.method = method
    return this
  }

  addHeader(key: string, value: string) {
    this.descriptor.headers[key] = value
    return this
  }

  setBody(body: unknown) {
    this.descriptor.body = body
    return this
  }

  setTimeout(timeoutMs: number) {
    this.descriptor.timeoutMs = timeoutMs
    return this
  }

  setRetries(retries: number) {
    this.descriptor.retries = retries
    return this
  }

  requireAuth(requireAuth: boolean) {
    this.descriptor.requireAuth = requireAuth
    return this
  }

  addQueryParam(key: string, value: QueryValue) {
    this.descriptor.query[key] = value
    return this
  }

  addQueryParams(params: QueryParams) {
    Object.entries(params).forEach(([k, v]) => {
      this.addQueryParam(k, v)
    })
    return this
  }

  build(): RequestDescriptor<TResponse> {
    if (!this.descriptor.url) {
      throw new Error('RequestBuilder: url is required')
    }

    return {
      ...this.descriptor,
      headers: { ...this.descriptor.headers },
      query: { ...this.descriptor.query },
    }
  }
}`}</code>
        </pre>
      </div>
      <div>
        Notice `build()` returns an{' '}
        <span className="font-semibold">immutable object</span> (copies of
        headers/query). This avoids side effects if the same builder is
        accidentally reused.
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Query params (the sharp edge)</h1>
      </div>
      <div>
        In real projects, query params are a constant source of bugs:
        `undefined` turning into a string, optional filters generating
        inconsistent URLs, and duplicated rules.
      </div>
      <div>
        The rule I follow: the builder accepts `undefined`, but URL
        serialization must exclude `undefined` and `null`.
      </div>
      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          buildUrlWithQuery.ts
        </div>
        <pre className="p-3 text-sm">
          <code className="language-ts">{`import { QueryParams } from './RequestBuilder'

export function buildUrlWithQuery(url: string, query: QueryParams): string {
  const entries = Object.entries(query).filter(([, v]) => v !== undefined && v !== null)

  if (entries.length === 0) return url

  const params = new URLSearchParams()
  for (const [k, v] of entries) {
    params.append(k, String(v))
  }

  const separator = url.includes('?') ? '&' : '?'
  return url + separator + params.toString()
}`}</code>
        </pre>
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Centralized HTTP executor</h1>
      </div>
      <div>
        This is where Axios, interceptors and resilience policies live. The
        Builder knows nothing about them.
      </div>
      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          httpClient.ts (Axios + refresh + retry)
        </div>
        <pre className="p-3 text-sm">
          <code className="language-ts">{`import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { RequestDescriptor } from './RequestBuilder'
import { buildUrlWithQuery } from './buildUrlWithQuery'

type TokenProvider = () => Promise<string | null>
type RefreshToken = () => Promise<void>

function isUnauthorized(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 401
}

async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number,
  delayMs: number,
): Promise<T> {
  let attempt = 0
  // simple retry, usually enough for most BFF/frontends
  while (true) {
    try {
      return await fn()
    } catch (err) {
      attempt += 1
      if (attempt > retries) throw err
      await new Promise((r) => setTimeout(r, delayMs))
    }
  }
}

export class HttpClient {
  private axios: AxiosInstance
  private getToken: TokenProvider
  private refreshToken: RefreshToken

  constructor(params: {
    baseURL: string
    getToken: TokenProvider
    refreshToken: RefreshToken
  }) {
    this.getToken = params.getToken
    this.refreshToken = params.refreshToken

    this.axios = axios.create({
      baseURL: params.baseURL,
    })

    // Auth interceptor: inject token only when the request requires it
    this.axios.interceptors.request.use(async (config) => {
      const requireAuth = (config.headers as any)?.['x-require-auth'] === 'true'

      if (!requireAuth) return config

      const token = await this.getToken()
      if (token) {
        config.headers = {
          ...(config.headers || {}),
          Authorization: 'Bearer ' + token,
        }
      }

      return config
    })
  }

  async request<TResponse>(descriptor: RequestDescriptor<TResponse>): Promise<TResponse> {
    const url = buildUrlWithQuery(descriptor.url, descriptor.query)

    const config: AxiosRequestConfig = {
      url,
      method: descriptor.method,
      headers: {
        ...descriptor.headers,
        // internal flag, consumed by the interceptor
        'x-require-auth': descriptor.requireAuth ? 'true' : 'false',
      },
      data: descriptor.body,
      timeout: descriptor.timeoutMs,
    }

    const exec = async () => {
      try {
        const res = await this.axios.request<TResponse>(config)
        return res.data
      } catch (err) {
        if (isUnauthorized(err) && descriptor.requireAuth) {
          await this.refreshToken()
          const res = await this.axios.request<TResponse>(config)
          return res.data
        }

        throw err
      }
    }

    return withRetry(exec, descriptor.retries ?? 0, 200)
  }
}`}</code>
        </pre>
      </div>
      <div>This design makes the contract explicit:</div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>
          the Builder defines <span className="font-semibold">what</span> will
          be called
        </li>
        <li>
          the HttpClient decides <span className="font-semibold">how</span> to
          execute with auth/resilience
        </li>
      </ul>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">
          Practical example (service getAll)
        </h1>
      </div>
      <div>
        In services, the Builder improves readability because the code reads as
        intent, not as a bag of options.
      </div>
      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          usersService.ts
        </div>
        <pre className="p-3 text-sm">
          <code className="language-ts">{`type User = { id: string; name: string }

type GetAllUsersQuery = {
  page?: number
  search?: string
  active?: boolean
}

export class UsersService {
  constructor(private http: HttpClient) {}

  async getAll(query: GetAllUsersQuery = {}): Promise<User[]> {
    const descriptor = new RequestBuilder<User[]>()
      .setUrl('/users')
      .setMethod('GET')
      .addQueryParams({
        page: query.page,
        search: query.search,
        active: query.active,
      })
      .setTimeout(8000)
      .setRetries(2)
      .build()

    return this.http.request(descriptor)
  }
}`}</code>
        </pre>
      </div>
      <div>
        The result is a service with low “accidental complexity”: it knows the
        endpoint domain, not the infrastructure.
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">
          Why this improves maintainability
        </h1>
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>
          <span className="font-semibold">Localized evolution</span>: adding
          `cache`, `idempotencyKey`, `traceId` becomes a new builder method.
        </li>
        <li>
          <span className="font-semibold">Standardization</span>: services build
          requests in a uniform way.
        </li>
        <li>
          <span className="font-semibold">Testability</span>: you can test the
          `RequestDescriptor` (build) separately from the executor.
        </li>
        <li>
          <span className="font-semibold">Clear separation</span>: Axios does
          not leak into the domain layer.
        </li>
      </ul>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Advantages (no marketing)</h1>
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>Reduces huge signatures and scattered conditionals</li>
        <li>
          Enables cross-cutting features (retry/refresh) without duplication
        </li>
        <li>Creates an internal “request language” the team understands</li>
        <li>
          Better observability: the executor can log `method/url` consistently
        </li>
      </ul>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Drawbacks and watch-outs</h1>
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>
          <span className="font-semibold">Overengineering</span>: in small apps
          it can be cost without payoff.
        </li>
        <li>
          <span className="font-semibold">Typing</span>: excessive genericity
          becomes noise without discipline.
        </li>
        <li>
          <span className="font-semibold">Mutable state</span>: builders should
          be treated as single-use objects.
        </li>
        <li>
          <span className="font-semibold">Axios integration</span>: be
          deliberate about what is a “request option” vs a “client policy”.
        </li>
      </ul>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">When to use vs avoid</h1>
      </div>
      <div>
        Use it when the product requires consistency and resilience across
        multiple integrations (especially with BFF and Next.js).
      </div>
      <div>Avoid it when:</div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>You have few calls and low parameter variability</li>
        <li>
          The team is not ready to maintain a centralized HTTP infrastructure
        </li>
        <li>
          The problem is better solved with a well-defined client + small
          functions (no builder)
        </li>
      </ul>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Conclusion</h1>
      </div>
      <div>
        The Builder Pattern applied to requests is not about “making it look
        pretty”; it is about reducing accidental complexity and preventing
        execution details (Axios, retry, refresh) from contaminating the domain.
      </div>
      <div>
        In projects that must scale safely — especially React/Next.js with a BFF
        layer — a well-designed `RequestBuilder` becomes an architectural
        stability point: the team evolves policies in the executor while keeping
        services predictable.
      </div>
      <div>
        Useful references:{' '}
        <Link
          target="_blank"
          className="text-primary underline"
          href="https://axios-http.com/"
        >
          Axios
        </Link>{' '}
        |{' '}
        <Link
          target="_blank"
          className="text-primary underline"
          href="https://refactoring.guru/design-patterns/builder"
        >
          Builder Pattern
        </Link>
      </div>

      <div>
        If you found this guide helpful, feel free to share it and if you have
        any questions or comments just contact me. Your journey to better API
        calls starts here! 🚀
      </div>
    </section>
  )
}

export default BuilderRequestBuilderTypescriptPage
