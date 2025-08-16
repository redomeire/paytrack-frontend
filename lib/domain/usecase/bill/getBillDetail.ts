import type { IGetBillDetailRequest, IGetBillDetailResponse } from '../../../common/types/http/bill/getBillDetail'
import type BillRepository from '../../repository/billRepository'

export class GetBillDetail {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IGetBillDetailRequest): Promise<IGetBillDetailResponse> {
    return this.billRepository.getBillDetail(request)
  }
}
