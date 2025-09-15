import type { IUpdateBillingInformationRequest, IUpdateBillingInformationResponse } from '../../../common/types/http/bill/updateBillingInformation'
import type BillRepository from '../../repository/billRepository'

export class UpdateBillingInformation {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IUpdateBillingInformationRequest): Promise<IUpdateBillingInformationResponse> {
    return this.billRepository.updateBillingInformation(request)
  }
}
