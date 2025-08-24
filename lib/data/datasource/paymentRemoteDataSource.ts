import type { $Fetch } from 'ofetch'
import type { IGetAllPaymentsRequest, IGetAllPaymentsResponse } from '../../common/types/http/payment/getAllPayments'
import type { ICreatePaymentRequest, ICreatePaymentResponse } from '../../common/types/http/payment/createPayment'
import type { IGetPaymentDetailRequest, IGetPaymentDetailResponse } from '../../common/types/http/payment/getPaymentDetail'
import type { IUpdatePaymentRequest, IUpdatePaymentResponse } from '../../common/types/http/payment/updatePayment'
import type { IDeletePaymentRequest, IDeletePaymentResponse } from '../../common/types/http/payment/deletePayment'

abstract class PaymentRemoteDataSource {
  abstract getAllPayments(request: IGetAllPaymentsRequest): Promise<IGetAllPaymentsResponse>
  abstract createPayment(request: ICreatePaymentRequest): Promise<ICreatePaymentResponse>
  abstract getPaymentDetail(request: IGetPaymentDetailRequest): Promise<IGetPaymentDetailResponse>
  abstract updatePayment(request: IUpdatePaymentRequest): Promise<IUpdatePaymentResponse>
  abstract deletePayment(request: IDeletePaymentRequest): Promise<IDeletePaymentResponse>
}

export class PaymentRemoteDataSourceImpl extends PaymentRemoteDataSource {
  private static instance: PaymentRemoteDataSourceImpl
  fetcher: $Fetch
  constructor(fetcher: $Fetch) {
    super()
    this.fetcher = fetcher
  }

  public static getInstance(fetcher: $Fetch): PaymentRemoteDataSourceImpl {
    if (!PaymentRemoteDataSourceImpl.instance) {
      PaymentRemoteDataSourceImpl.instance = new PaymentRemoteDataSourceImpl(fetcher)
    }
    return PaymentRemoteDataSourceImpl.instance
  }

  getAllPayments(request: IGetAllPaymentsRequest): Promise<IGetAllPaymentsResponse> {
    const response = this.fetcher('/payments', {
      ...request.options
    })
    return response
  }

  createPayment(request: ICreatePaymentRequest): Promise<ICreatePaymentResponse> {
    const response = this.fetcher('/payments', {
      method: 'POST',
      body: JSON.stringify(request.payload),
      ...request.options
    })
    return response
  }

  getPaymentDetail(request: IGetPaymentDetailRequest): Promise<IGetPaymentDetailResponse> {
    const response = this.fetcher(`/payments/${request.payload.id}`, {
      ...request.options
    })
    return response
  }

  updatePayment(request: IUpdatePaymentRequest): Promise<IUpdatePaymentResponse> {
    const response = this.fetcher(`/payments/${request.payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(request.payload),
      ...request.options
    })
    return response
  }

  deletePayment(request: IDeletePaymentRequest): Promise<IDeletePaymentResponse> {
    const response = this.fetcher(`/payments/${request.payload.id}`, {
      method: 'DELETE',
      ...request.options
    })
    return response
  }
}
