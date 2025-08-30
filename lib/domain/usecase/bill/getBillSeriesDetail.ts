import type { IGetRecurringBillDetailRequest, IGetRecurringBillDetailResponse } from '../../../common/types/http/bill/getRecurringBillDetail'
import type BillRepository from '../../repository/billRepository'

export class GetBillSeriesDetail {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IGetRecurringBillDetailRequest): Promise<IGetRecurringBillDetailResponse> {
    return this.billRepository.getRecurringBillDetail(request)
  }
}
