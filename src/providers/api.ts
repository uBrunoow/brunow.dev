import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { InvalidCredentialsError, UnauthorizedError } from '../errors/webapp'
import getHeaders from './getHeaders'

export interface IHttpRequestParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraHeaders?: any
  showToastOnGenericErrorOnly?: boolean
  overwriteEndpoint?: string
  enableRequestThrottle?: boolean
  axiosConfig?: Omit<
    AxiosRequestConfig,
    'headers' | 'method' | 'data' | 'cancelToken'
  >
}

export interface IPostRequestParams extends IHttpRequestParams {
  body?: object | string
  image?: string
  status?: string
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const httpRequest = async (
  uri: string,
  method: HttpMethod,
  props: IPostRequestParams = {},
  isRetry = false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const headers = getHeaders(props)

  const endpoint = `${process.env.NEXT_PUBLIC_BASE_API_URL}/${uri}`

  const body = props.body ? { data: props.body } : {}

  const params = {
    ...(props.axiosConfig || {}),
    ...body,
    headers,
    method,
  }

  try {
    const response = await axios(endpoint, params)
    return response.data
  } catch (error) {
    console.error(error)
    if (
      error instanceof AxiosError &&
      error?.response?.status &&
      [401, 403, 405].includes(error.response.status)
    ) {
      const { token } = parseCookies()
      if (!isRetry && token && error.response.data.code === 'token_not_valid') {
        const { refresh } = parseCookies()

        try {
          const refreshedResponse = await httpRequest(
            'token/refresh/',
            'POST',
            {
              body: { refresh },
            },
            true,
          )
          setCookie(undefined, 'token', refreshedResponse.data.access, {
            maxAge: 60 * 60 * 1, // 1 hour
          })
          return await httpRequest(endpoint, method, props, true)
        } catch (refreshError) {
          if (
            refreshError instanceof AxiosError &&
            refreshError?.response?.data?.code !== 'token_not_valid'
          ) {
            console.error('error revalidando usuário')
            return
          }
        }
      } else if (
        error.response.data.detail ===
        'No active account found with the given credentials'
      ) {
        throw new InvalidCredentialsError()
      }
      throw new UnauthorizedError(
        'Você não tem permissão para acessar esta página',
      )
    }
    throw error
  }
}

export const get = (uri: string, params?: IHttpRequestParams) =>
  httpRequest(uri, 'GET', params, false)

export const post = (uri: string, params?: IPostRequestParams) => {
  return httpRequest(uri, 'POST', params, false)
}

export const put = (uri: string, params?: IPostRequestParams) =>
  httpRequest(uri, 'PUT', params, false)

export const patch = (uri: string, params?: IPostRequestParams) =>
  httpRequest(uri, 'PATCH', params, false)

export const del = (uri: string, props?: IHttpRequestParams) =>
  httpRequest(uri, 'DELETE', props, false)
