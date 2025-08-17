import type { ICreatePaymentRequest, ICreatePaymentResponse } from '~~/lib/common/types/http/payment/createPayment'
import type {
  IGetAllPaymentsRequest,
  IGetAllPaymentsResponse
} from '../../common/types/http/payment/getAllPayments'
import type {
  IGetPaymentDetailRequest,
  IGetPaymentDetailResponse
} from '~~/lib/common/types/http/payment/getPaymentDetail'
import type {
  IUpdatePaymentRequest,
  IUpdatePaymentResponse
} from '~~/lib/common/types/http/payment/updatePayment'
import type {
  IDeletePaymentRequest,
  IDeletePaymentResponse
} from '~~/lib/common/types/http/payment/deletePayment'

abstract class PaymentRepository {
  abstract getAllPayments(request: IGetAllPaymentsRequest): Promise<IGetAllPaymentsResponse>
  abstract createPayment(request: ICreatePaymentRequest): Promise<ICreatePaymentResponse>
  abstract getPaymentDetail(request: IGetPaymentDetailRequest): Promise<IGetPaymentDetailResponse>
  abstract updatePayment(request: IUpdatePaymentRequest): Promise<IUpdatePaymentResponse>
  abstract deletePayment(request: IDeletePaymentRequest): Promise<IDeletePaymentResponse>
}

export default PaymentRepository
