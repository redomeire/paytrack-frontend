import type { IDeleteBillingInformationRequest, IDeleteBillingInformationResponse } from '../../../common/types/http/bill/deleteBillingInformation'
import type BillRepository from '../../repository/billRepository'

export class DeleteBillingInformation {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IDeleteBillingInformationRequest): Promise<IDeleteBillingInformationResponse> {
    return this.billRepository.deleteBillingInformation(request)
  }
}
