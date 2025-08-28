import type { IBillCategory } from '~~/lib/domain/entity/bill-category'
import type { IBillSeries } from '../../../../domain/entity/bill-series'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'
import type { IBill } from '~~/lib/domain/entity/bill'

type IGetRecurringBillDetailResponse = IHttpResponse<IBillSeries
  & {
    bill_category: IBillCategory
    bills: IBill[]
  }>
interface IGetRecurringBillDetailRequest {
  payload: {
    id: string
  }
  options?: FetchOptions
}

export type { IGetRecurringBillDetailResponse, IGetRecurringBillDetailRequest }
