import type { IBillSeries } from '../../../../domain/entity/bill-series'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type ICreateBillSeriesResponse = IHttpResponse<{
  bill: IBillSeries
}>
interface ICreateBillSeriesRequest {
  payload: Partial<IBillSeries>
  options?: FetchOptions
}

export type { ICreateBillSeriesResponse, ICreateBillSeriesRequest }
