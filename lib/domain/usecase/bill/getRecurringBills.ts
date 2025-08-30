import type { IGetRecurringBillsRequest, IGetRecurringBillsResponse } from '../../../common/types/http/bill/getRecurringBill'
import type BillRepository from '../../repository/billRepository'

export class GetRecurringBills {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IGetRecurringBillsRequest): Promise<IGetRecurringBillsResponse> {
    return this.billRepository.getRecurringBills(request)
  }
}
