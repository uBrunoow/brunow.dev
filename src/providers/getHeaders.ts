import { parseCookies } from 'nookies'
import type { IHttpRequestParams } from './api'

const getHeaders = (props: IHttpRequestParams) => {
  let token_headers = null
  if (typeof window !== 'undefined') {
    const { token } = parseCookies()
    token_headers = token
  }
  const authHeader = token_headers
    ? { Authorization: `Bearer ${token_headers}` }
    : {}
  const headers = {
    ...authHeader,
    'Content-type': 'application/json',
    ...props.extraHeaders,
  }

  return headers
}
export default getHeaders
