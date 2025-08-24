import type { IPayment } from '../../../../domain/entity/payment'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetAllPaymentsResponse = IHttpResponse<IPayment[], true>
interface IGetAllPaymentsRequest {
  options?: FetchOptions
}

export type { IGetAllPaymentsResponse, IGetAllPaymentsRequest }
