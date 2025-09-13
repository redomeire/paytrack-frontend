import type { ICreateRecipientAccountRequest, ICreateRecipientAccountResponse } from '../../../common/types/http/bill/createRecipientAccount'
import type BillRepository from '../../repository/billRepository'

export class CreateRecipientAccount {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: ICreateRecipientAccountRequest): Promise<ICreateRecipientAccountResponse> {
    return this.billRepository.createRecipientAccount(request)
  }
}
