import type { IBillCategory } from '~~/lib/domain/entity/bill-category'
import type { IBill } from '../../../../domain/entity/bill'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetBillDetailResponse = IHttpResponse<IBill & { bill_category: IBillCategory }>
interface IGetBillDetailRequest {
  payload: {
    id: string
  }
  options?: FetchOptions
}

export type { IGetBillDetailResponse, IGetBillDetailRequest }
