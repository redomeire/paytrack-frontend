import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IForgotPasswordResponse = IHttpResponse

interface IForgotPasswordRequest {
  payload: {
    email: string
  }
  options?: FetchOptions
}

export type { IForgotPasswordResponse, IForgotPasswordRequest }
