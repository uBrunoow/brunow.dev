export class UnauthorizedError extends Error {
  constructor(message = 'Não autorizado') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message = 'Credenciais inválidas') {
    super(message)
    this.name = 'InvalidCredentialsError'
  }
}

export class ApiGetDataError extends Error {
  status?: number
  response?: string

  constructor(message: string, status?: number, response?: string) {
    super(message ?? 'Erro ao buscar dados da API')
    this.status = status ?? 500
    this.response = response ?? ''
    this.name = 'ApiGetDataError'
  }
}

export class ProvidersNotFoundError extends Error {
  constructor(message: string) {
    super(message ?? 'Provedores não encontrados')
    this.name = 'ProvidersNotFoundError'
  }
}
