import type {
  IGetPaymentDetailRequest,
  IGetPaymentDetailResponse
} from '../../../common/types/http/payment/getPaymentDetail'
import type PaymentRepository from '../../repository/paymentRepository'

export class GetPaymentDetail {
  paymentRepository: PaymentRepository
  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository
  }

  async execute(request: IGetPaymentDetailRequest): Promise<IGetPaymentDetailResponse> {
    return this.paymentRepository.getPaymentDetail(request)
  }
}
