import type { ICreateBillRequest, ICreateBillResponse } from '../../../common/types/http/bill/createBill'
import type BillRepository from '../../repository/billRepository'

export class CreateBill {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: ICreateBillRequest): Promise<ICreateBillResponse> {
    return this.billRepository.createBill(request)
  }
}
