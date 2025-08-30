import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IDeleteBillSeriesResponse = IHttpResponse
interface IDeleteBillSeriesRequest {
  payload: {
    id: string
  }
  options?: FetchOptions
}

export type { IDeleteBillSeriesResponse, IDeleteBillSeriesRequest }
