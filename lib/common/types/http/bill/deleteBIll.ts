import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IDeleteBillResponse = IHttpResponse
interface IDeleteBillRequest {
  payload: {
    id: string
  }
  options?: FetchOptions
}

export type { IDeleteBillResponse, IDeleteBillRequest }
