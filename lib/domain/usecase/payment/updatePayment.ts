import type {
  IUpdatePaymentRequest,
  IUpdatePaymentResponse
} from '../../../common/types/http/payment/updatePayment'
import type PaymentRepository from '../../repository/paymentRepository'

export class UpdatePayment {
  paymentRepository: PaymentRepository
  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository
  }

  async execute(request: IUpdatePaymentRequest): Promise<IUpdatePaymentResponse> {
    return this.paymentRepository.updatePayment(request)
  }
}
