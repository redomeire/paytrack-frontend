import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetSpendingCountByCategoryResponse = IHttpResponse<{
  labels: string[]
  totals: number[]
  series: number[]
}>

interface IGetSpendingCountByCategoryRequest {
  options?: FetchOptions
}

export type {
  IGetSpendingCountByCategoryResponse,
  IGetSpendingCountByCategoryRequest
}
