import type { IBill } from '../../../../domain/entity/bill'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type ICreateBillResponse = IHttpResponse<{
  bill: IBill
}>
interface ICreateBillRequest {
  payload: Partial<IBill>
  options?: FetchOptions
}

export type { ICreateBillResponse, ICreateBillRequest }
