import type { IBillCategory } from '../../../../domain/entity/bill-category'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type ICreateBillCategoryResponse = IHttpResponse<{
  bill_category: IBillCategory
}>
interface ICreateBillCategoryRequest {
  payload: Partial<IBillCategory>
  options?: FetchOptions
}

export type { ICreateBillCategoryResponse, ICreateBillCategoryRequest }
