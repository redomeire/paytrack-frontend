import type { IGetBillingInformationRequest, IGetBillingInformationResponse } from '../../../common/types/http/bill/getBillingInformations'
import type BillRepository from '../../repository/billRepository'

export class GetAllBillingInformations {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IGetBillingInformationRequest): Promise<IGetBillingInformationResponse> {
    return this.billRepository.getAllBillingInformations(request)
  }
}
