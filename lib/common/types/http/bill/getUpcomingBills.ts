import type { IBill } from '../../../../domain/entity/bill'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetUpcomingBillsResponse = IHttpResponse<IBill[], true>
interface IGetUpcomingBillsRequest {
  options?: FetchOptions
}

export type { IGetUpcomingBillsResponse, IGetUpcomingBillsRequest }
