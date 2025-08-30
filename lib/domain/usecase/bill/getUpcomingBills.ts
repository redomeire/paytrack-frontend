import type { IGetUpcomingBillsRequest, IGetUpcomingBillsResponse } from '../../../common/types/http/bill/getUpcomingBills'
import type BillRepository from '../../repository/billRepository'

export class GetUpcomingBills {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IGetUpcomingBillsRequest): Promise<IGetUpcomingBillsResponse> {
    return this.billRepository.getUpcomingBills(request)
  }
}
