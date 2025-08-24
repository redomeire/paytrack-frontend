import type {
  IGetAllPaymentsRequest,
  IGetAllPaymentsResponse
} from '../../../common/types/http/payment/getAllPayments'
import type PaymentRepository from '../../repository/paymentRepository'

export class GetAllPayments {
  paymentRepository: PaymentRepository
  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository
  }

  async execute(request: IGetAllPaymentsRequest): Promise<IGetAllPaymentsResponse> {
    return this.paymentRepository.getAllPayments(request)
  }
}
