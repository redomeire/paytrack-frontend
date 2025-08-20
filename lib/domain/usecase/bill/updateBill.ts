import type { IUpdateBillRequest, IUpdateBillResponse } from '../../../common/types/http/bill/updateBill'
import type BillRepository from '../../repository/billRepository'

export class UpdateBill {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IUpdateBillRequest): Promise<IUpdateBillResponse> {
    return this.billRepository.updateBill(request)
  }
}
