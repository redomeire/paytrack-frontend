import type { IGetAllBillsRequest, IGetAllBillsResponse } from '../../../common/types/http/bill/getAllBills'
import type BillRepository from '../../repository/billRepository'

export class GetAllBills {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IGetAllBillsRequest): Promise<IGetAllBillsResponse> {
    return this.billRepository.getAllBills(request)
  }
}
