import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetSummaryResponse = IHttpResponse<{
  total_unpaid: number
  upcoming_count: number
  total_bills_this_month: number
  overdue_count: number
}>

interface IGetSummaryRequest {
  options?: FetchOptions
}

export type {
  IGetSummaryResponse,
  IGetSummaryRequest
}
