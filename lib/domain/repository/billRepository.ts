import type { ICreateBillCategoryRequest, ICreateBillCategoryResponse } from '~~/lib/common/types/http/bill/createBillCategory'
import type { ICreateBillRequest, ICreateBillResponse } from '../../common/types/http/bill/createBill'
import type { IGetAllBillCategoriesRequest, IGetAllBillCategoriesResponse } from '~~/lib/common/types/http/bill/getAllBillCategories'

abstract class BillRepository {
  abstract createBill(request: ICreateBillRequest): Promise<ICreateBillResponse>
  abstract createBillCategory(request: ICreateBillCategoryRequest): Promise<ICreateBillCategoryResponse>
  abstract getAllBillCategories(request: IGetAllBillCategoriesRequest): Promise<IGetAllBillCategoriesResponse>
}

export default BillRepository
