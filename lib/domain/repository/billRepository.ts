import type { ICreateBillCategoryRequest, ICreateBillCategoryResponse } from '~~/lib/common/types/http/bill/createBillCategory'
import type { ICreateBillRequest, ICreateBillResponse } from '../../common/types/http/bill/createBill'
import type { IGetAllBillCategoriesRequest, IGetAllBillCategoriesResponse } from '~~/lib/common/types/http/bill/getAllBillCategories'
import type { IGetAllBillsRequest, IGetAllBillsResponse } from '~~/lib/common/types/http/bill/getAllBills'
import type { IDeleteBillRequest, IDeleteBillResponse } from '~~/lib/common/types/http/bill/deleteBIll'

abstract class BillRepository {
  abstract createBill(request: ICreateBillRequest): Promise<ICreateBillResponse>
  abstract createBillCategory(request: ICreateBillCategoryRequest): Promise<ICreateBillCategoryResponse>
  abstract getAllBillCategories(request: IGetAllBillCategoriesRequest): Promise<IGetAllBillCategoriesResponse>
  abstract getAllBills(request: IGetAllBillsRequest): Promise<IGetAllBillsResponse>
  abstract deleteBill(request: IDeleteBillRequest): Promise<IDeleteBillResponse>
}

export default BillRepository
