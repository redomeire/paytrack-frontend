import type { ICreateBillingInformationRequest, ICreateBillingInformationResponse } from '../../../common/types/http/bill/createBillingInformation'
import type BillRepository from '../../repository/billRepository'

export class CreateBillingInformation {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: ICreateBillingInformationRequest): Promise<ICreateBillingInformationResponse> {
    return this.billRepository.createBillingInformation(request)
  }
}
