import type { IDeleteBillRequest, IDeleteBillResponse } from '../../../common/types/http/bill/deleteBIll'
import type BillRepository from '../../repository/billRepository'

export class DeleteBill {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IDeleteBillRequest): Promise<IDeleteBillResponse> {
    return this.billRepository.deleteBill(request)
  }
}
