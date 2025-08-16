import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IChangePasswordResponse = IHttpResponse

interface IChangePasswordRequest {
  payload: {
    password: string
    password_confirmation: string
  }
  options?: FetchOptions
}

export type { IChangePasswordResponse, IChangePasswordRequest }
