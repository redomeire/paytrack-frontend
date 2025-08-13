import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IResetPasswordResponse = IHttpResponse

interface IResetPasswordRequest {
  payload: {
    token: string
    email: string
    password: string
    password_confirmation: string
  }
  options?: FetchOptions
}

export type { IResetPasswordResponse, IResetPasswordRequest }
