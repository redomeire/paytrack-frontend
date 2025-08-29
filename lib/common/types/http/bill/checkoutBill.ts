import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type ICheckoutBillResponse = IHttpResponse<{
  invoice_url: string
}>
interface ICheckoutBillRequest {
  payload: {
    billId: string
  }
  options?: FetchOptions
}

export type { ICheckoutBillResponse, ICheckoutBillRequest }
