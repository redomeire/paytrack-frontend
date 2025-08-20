import type { IGetAllBillCategoriesRequest, IGetAllBillCategoriesResponse } from '../../../common/types/http/bill/getAllBillCategories'
import type BillRepository from '../../repository/billRepository'

export class GetAllBillCategories {
  billRepository: BillRepository
  constructor(billRepository: BillRepository) {
    this.billRepository = billRepository
  }

  execute(request: IGetAllBillCategoriesRequest): Promise<IGetAllBillCategoriesResponse> {
    return this.billRepository.getAllBillCategories(request)
  }
}
