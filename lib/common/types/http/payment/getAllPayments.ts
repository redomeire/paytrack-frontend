import type { IBill } from '~~/lib/domain/entity/bill'
import type { IPayment } from '../../../../domain/entity/payment'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type AggregatedPayment = IPayment & IBill

type IGetAllPaymentsResponse = IHttpResponse<AggregatedPayment[], true>
interface IGetAllPaymentsRequest {
  options?: FetchOptions
}

export type { IGetAllPaymentsResponse, IGetAllPaymentsRequest }
