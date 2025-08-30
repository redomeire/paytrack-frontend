import type { IBillSeries } from '../../../../domain/entity/bill-series'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetRecurringBillsResponse = IHttpResponse<IBillSeries[], true>
interface IGetRecurringBillsRequest {
  options?: FetchOptions
}

export type { IGetRecurringBillsResponse, IGetRecurringBillsRequest }
