import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetMonthlySpendingTrendResponse = IHttpResponse<{
  labels: string[]
  totals: number[]
}>

interface IGetMonthlySpendingTrendRequest {
  options?: FetchOptions
}

export type {
  IGetMonthlySpendingTrendResponse,
  IGetMonthlySpendingTrendRequest
}
