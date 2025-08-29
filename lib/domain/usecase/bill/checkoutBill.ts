import type { ICheckoutBillRequest, ICheckoutBillResponse } from '../../../common/types/http/bill/checkoutBill'
import type BillRepository from '../../repository/billRepository'

export class CheckoutBill {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: ICheckoutBillRequest): Promise<ICheckoutBillResponse> {
    return this.billRepository.checkoutBill(request)
  }
}
