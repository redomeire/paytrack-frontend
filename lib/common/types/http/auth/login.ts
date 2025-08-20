import type { IUser } from '../../../../domain/entity/user'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type ILoginResponse = IHttpResponse<{
  user: IUser
  token: string
}>
interface ILoginRequest {
  payload: {
    email: string
    password: string
  }
  options?: FetchOptions
}

export type { ILoginResponse, ILoginRequest }
