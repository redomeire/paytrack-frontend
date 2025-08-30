import type { IBillSeries } from '../../../../domain/entity/bill-series'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IUpdateBillSeriesResponse = IHttpResponse<IBillSeries>
interface IUpdateBillSeriesRequest {
  payload: {
    billSeries: Partial<IBillSeries>
  }
  options?: FetchOptions
}

export type { IUpdateBillSeriesResponse, IUpdateBillSeriesRequest }
