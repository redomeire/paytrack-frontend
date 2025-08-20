import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IAuthorizeSocialLoginResponse = IHttpResponse

interface IAuthorizeSocialLoginRequest {
  payload: {
    code: string
    provider: string
  }
  options?: FetchOptions
}

export type { IAuthorizeSocialLoginResponse, IAuthorizeSocialLoginRequest }
