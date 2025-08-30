import type { IUpdateBillSeriesRequest, IUpdateBillSeriesResponse } from '../../../common/types/http/bill/updateBillSeries'
import type BillRepository from '../../repository/billRepository'

export class UpdateBillSeries {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IUpdateBillSeriesRequest): Promise<IUpdateBillSeriesResponse> {
    return this.billRepository.updateBillSeries(request)
  }
}
