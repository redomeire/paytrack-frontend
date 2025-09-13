import type { ISetBillingInformationAsDefaultRequest, ISetBillingInformationAsDefaultResponse } from '../../../common/types/http/bill/setBillingInformationAsDefault'
import type BillRepository from '../../repository/billRepository'

export class SetBillingInformationAsDefault {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: ISetBillingInformationAsDefaultRequest): Promise<ISetBillingInformationAsDefaultResponse> {
    return this.billRepository.setBillingInformationAsDefault(request)
  }
}
