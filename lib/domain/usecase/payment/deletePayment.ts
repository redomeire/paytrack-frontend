import type {
  IDeletePaymentRequest,
  IDeletePaymentResponse
} from '../../../common/types/http/payment/deletePayment'
import type PaymentRepository from '../../repository/paymentRepository'

export class DeletePayment {
  paymentRepository: PaymentRepository
  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository
  }

  async execute(request: IDeletePaymentRequest): Promise<IDeletePaymentResponse> {
    return this.paymentRepository.deletePayment(request)
  }
}
