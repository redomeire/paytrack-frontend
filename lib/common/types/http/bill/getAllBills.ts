import type { IBill } from '../../../../domain/entity/bill'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetAllBillsResponse = IHttpResponse<IBill[]>
interface IGetAllBillsRequest {
  options?: FetchOptions
}

export type { IGetAllBillsResponse, IGetAllBillsRequest }
