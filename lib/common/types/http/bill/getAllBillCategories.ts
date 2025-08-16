import type { IBillCategory } from '../../../../domain/entity/bill-category'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetAllBillCategoriesResponse = IHttpResponse<IBillCategory[]>
interface IGetAllBillCategoriesRequest {
  options?: FetchOptions
}

export type { IGetAllBillCategoriesResponse, IGetAllBillCategoriesRequest }
