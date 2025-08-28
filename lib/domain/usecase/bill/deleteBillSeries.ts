import type { IDeleteBillSeriesRequest, IDeleteBillSeriesResponse } from '../../../common/types/http/bill/deleteBillSeries'
import type BillRepository from '../../repository/billRepository'

export class DeleteBillSeries {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IDeleteBillSeriesRequest): Promise<IDeleteBillSeriesResponse> {
    return this.billRepository.deleteBillSeries(request)
  }
}
