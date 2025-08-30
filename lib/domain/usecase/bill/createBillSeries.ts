import type { ICreateBillSeriesRequest, ICreateBillSeriesResponse } from '../../../common/types/http/bill/createBillSeries'
import type BillRepository from '../../repository/billRepository'

export class CreateBillSeries {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: ICreateBillSeriesRequest): Promise<ICreateBillSeriesResponse> {
    return this.billRepository.createBillSeries(request)
  }
}
