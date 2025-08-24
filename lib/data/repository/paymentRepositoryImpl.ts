import type { ICreatePaymentRequest, ICreatePaymentResponse } from '~~/lib/common/types/http/payment/createPayment'
import type {
  IGetAllPaymentsRequest,
  IGetAllPaymentsResponse
} from '../../common/types/http/payment/getAllPayments'
import PaymentRepository from '../../domain/repository/paymentRepository'
import type { PaymentRemoteDataSourceImpl } from '../datasource/paymentRemoteDataSource'
import type { IGetPaymentDetailRequest, IGetPaymentDetailResponse } from '~~/lib/common/types/http/payment/getPaymentDetail'
import type { IUpdatePaymentRequest, IUpdatePaymentResponse } from '~~/lib/common/types/http/payment/updatePayment'
import type { IDeletePaymentRequest, IDeletePaymentResponse } from '~~/lib/common/types/http/payment/deletePayment'

export class PaymentRepositoryImpl extends PaymentRepository {
  private paymentRemoteDataSource: PaymentRemoteDataSourceImpl
  constructor(paymentRemoteDataSource: PaymentRemoteDataSourceImpl) {
    super()
    this.paymentRemoteDataSource = paymentRemoteDataSource
  }

  getAllPayments(request: IGetAllPaymentsRequest): Promise<IGetAllPaymentsResponse> {
    return this.paymentRemoteDataSource.getAllPayments(request)
  }

  createPayment(request: ICreatePaymentRequest): Promise<ICreatePaymentResponse> {
    return this.paymentRemoteDataSource.createPayment(request)
  }

  getPaymentDetail(request: IGetPaymentDetailRequest): Promise<IGetPaymentDetailResponse> {
    return this.paymentRemoteDataSource.getPaymentDetail(request)
  }

  updatePayment(request: IUpdatePaymentRequest): Promise<IUpdatePaymentResponse> {
    return this.paymentRemoteDataSource.updatePayment(request)
  }

  deletePayment(request: IDeletePaymentRequest): Promise<IDeletePaymentResponse> {
    return this.paymentRemoteDataSource.deletePayment(request)
  }
}
