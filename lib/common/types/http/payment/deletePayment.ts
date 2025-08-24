import type { IPayment } from '../../../../domain/entity/payment'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IDeletePaymentResponse = IHttpResponse<IPayment, false>
interface IDeletePaymentRequest {
  payload: {
    id: string
  }
  options?: FetchOptions
}

export type { IDeletePaymentResponse, IDeletePaymentRequest }
