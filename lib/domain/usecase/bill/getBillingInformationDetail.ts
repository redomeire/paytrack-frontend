import type { IGetBillingInformationDetailRequest, IGetBillingInformationDetailResponse } from '../../../common/types/http/bill/getBillingInformationDetail'
import type BillRepository from '../../repository/billRepository'

export class GetBillingInformationDetail {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IGetBillingInformationDetailRequest): Promise<IGetBillingInformationDetailResponse> {
    return this.billRepository.getBillingInformationDetail(request)
  }
}
