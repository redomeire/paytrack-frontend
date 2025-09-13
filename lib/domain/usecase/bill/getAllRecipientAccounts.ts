import type { IGetRecipientAccountRequest, IGetRecipientAccountResponse } from '../../../common/types/http/bill/getRecipientAccounts'
import type BillRepository from '../../repository/billRepository'

export class GetAllRecipientAccounts {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IGetRecipientAccountRequest): Promise<IGetRecipientAccountResponse> {
    return this.billRepository.getAllRecipientAccounts(request)
  }
}
