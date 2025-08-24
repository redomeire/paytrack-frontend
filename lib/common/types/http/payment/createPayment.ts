import type { IPayment } from '../../../../domain/entity/payment'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type ICreatePaymentResponse = IHttpResponse<IPayment, false>
interface ICreatePaymentRequest {
  payload: Partial<IPayment>
  options?: FetchOptions
}

export type { ICreatePaymentResponse, ICreatePaymentRequest }
