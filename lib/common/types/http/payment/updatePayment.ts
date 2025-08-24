import type { IPayment } from '../../../../domain/entity/payment'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IUpdatePaymentResponse = IHttpResponse<IPayment, false>
interface IUpdatePaymentRequest {
  payload: Partial<IPayment>
  options?: FetchOptions
}

export type { IUpdatePaymentResponse, IUpdatePaymentRequest }
