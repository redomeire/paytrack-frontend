import type {
  ICreatePaymentRequest,
  ICreatePaymentResponse
} from '../../../common/types/http/payment/createPayment'
import type PaymentRepository from '../../repository/paymentRepository'

export class CreatePayment {
  paymentRepository: PaymentRepository
  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository
  }

  async execute(request: ICreatePaymentRequest): Promise<ICreatePaymentResponse> {
    return this.paymentRepository.createPayment(request)
  }
}
