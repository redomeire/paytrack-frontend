import type {
  ICreateBillCategoryRequest,
  ICreateBillCategoryResponse
} from '~~/lib/common/types/http/bill/createBillCategory'
import type {
  ICreateBillRequest,
  ICreateBillResponse
} from '../../common/types/http/bill/createBill'
import type {
  IGetAllBillCategoriesRequest,
  IGetAllBillCategoriesResponse
} from '~~/lib/common/types/http/bill/getAllBillCategories'
import type {
  IGetUpcomingBillsRequest,
  IGetUpcomingBillsResponse
} from '~~/lib/common/types/http/bill/getUpcomingBills'
import type {
  IGetRecurringBillsRequest,
  IGetRecurringBillsResponse
} from '~~/lib/common/types/http/bill/getRecurringBill'
import type {
  IDeleteBillRequest,
  IDeleteBillResponse
} from '~~/lib/common/types/http/bill/deleteBill'
import type {
  IDeleteBillSeriesRequest,
  IDeleteBillSeriesResponse
} from '~~/lib/common/types/http/bill/deleteBillSeries'
import type {
  IGetBillDetailRequest,
  IGetBillDetailResponse
} from '~~/lib/common/types/http/bill/getBillDetail'
import type {
  IGetRecurringBillDetailRequest,
  IGetRecurringBillDetailResponse
} from '~~/lib/common/types/http/bill/getRecurringBillDetail'
import type {
  IUpdateBillRequest,
  IUpdateBillResponse
} from '~~/lib/common/types/http/bill/updateBill'
import type {
  IUpdateBillSeriesRequest,
  IUpdateBillSeriesResponse
} from '~~/lib/common/types/http/bill/updateBillSeries'
import type {
  ICreateBillSeriesRequest,
  ICreateBillSeriesResponse
} from '~~/lib/common/types/http/bill/createBillSeries'

abstract class BillRepository {
  abstract createBill(request: ICreateBillRequest): Promise<ICreateBillResponse>
  abstract createBillSeries(request: ICreateBillSeriesRequest): Promise<ICreateBillSeriesResponse>
  abstract createBillCategory(request: ICreateBillCategoryRequest): Promise<ICreateBillCategoryResponse>
  abstract getAllBillCategories(request: IGetAllBillCategoriesRequest): Promise<IGetAllBillCategoriesResponse>
  abstract getUpcomingBills(request: IGetUpcomingBillsRequest): Promise<IGetUpcomingBillsResponse>
  abstract getBillDetail(request: IGetBillDetailRequest): Promise<IGetBillDetailResponse>
  abstract updateBill(request: IUpdateBillRequest): Promise<IUpdateBillResponse>
  abstract deleteBill(request: IDeleteBillRequest): Promise<IDeleteBillResponse>
  abstract getRecurringBills(request: IGetRecurringBillsRequest): Promise<IGetRecurringBillsResponse>
  abstract getRecurringBillDetail(request: IGetRecurringBillDetailRequest): Promise<IGetRecurringBillDetailResponse>
  abstract updateBillSeries(request: IUpdateBillSeriesRequest): Promise<IUpdateBillSeriesResponse>
  abstract deleteBillSeries(request: IDeleteBillSeriesRequest): Promise<IDeleteBillSeriesResponse>
}

export default BillRepository
