import type { IPayment } from '../../../../domain/entity/payment'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetPaymentDetailResponse = IHttpResponse<IPayment, false>
interface IGetPaymentDetailRequest {
  payload: {
    id: string
  }
  options?: FetchOptions
}

export type { IGetPaymentDetailResponse, IGetPaymentDetailRequest }
