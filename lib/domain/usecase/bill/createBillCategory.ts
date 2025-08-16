import type { ICreateBillCategoryRequest, ICreateBillCategoryResponse } from '../../../common/types/http/bill/createBillCategory'
import type BillRepository from '../../repository/billRepository'

export class CreateBillCategory {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: ICreateBillCategoryRequest): Promise<ICreateBillCategoryResponse> {
    return this.billRepository.createBillCategory(request)
  }
}
