import type { IBill } from '../../../../domain/entity/bill'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IUpdateBillResponse = IHttpResponse<IBill>
interface IUpdateBillRequest {
  payload: {
    bill: Partial<IBill>
  }
  options?: FetchOptions
}

export type { IUpdateBillResponse, IUpdateBillRequest }
