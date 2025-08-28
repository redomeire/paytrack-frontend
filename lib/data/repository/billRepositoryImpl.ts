import type { ICreateBillCategoryRequest, ICreateBillCategoryResponse } from '~~/lib/common/types/http/bill/createBillCategory'
import type { ICreateBillRequest, ICreateBillResponse } from '../../common/types/http/bill/createBill'
import BillRepository from '../../domain/repository/billRepository'
import type { BillRemoteDataSourceImpl } from '../datasource/billRemoteDataSource'
import type { IGetAllBillCategoriesRequest, IGetAllBillCategoriesResponse } from '~~/lib/common/types/http/bill/getAllBillCategories'
import type { IGetUpcomingBillsRequest, IGetUpcomingBillsResponse } from '~~/lib/common/types/http/bill/getUpcomingBills'
import type { IDeleteBillRequest, IDeleteBillResponse } from '~~/lib/common/types/http/bill/deleteBill'
import type { IGetBillDetailRequest, IGetBillDetailResponse } from '~~/lib/common/types/http/bill/getBillDetail'
import type { IUpdateBillRequest, IUpdateBillResponse } from '~~/lib/common/types/http/bill/updateBill'
import type { ICreateBillSeriesRequest, ICreateBillSeriesResponse } from '~~/lib/common/types/http/bill/createBillSeries'
import type { IDeleteBillSeriesRequest, IDeleteBillSeriesResponse } from '~~/lib/common/types/http/bill/deleteBillSeries'
import type { IGetRecurringBillDetailRequest, IGetRecurringBillDetailResponse } from '~~/lib/common/types/http/bill/getRecurringBillDetail'
import type { IUpdateBillSeriesRequest, IUpdateBillSeriesResponse } from '~~/lib/common/types/http/bill/updateBillSeries'
import type { IGetRecurringBillsRequest, IGetRecurringBillsResponse } from '~~/lib/common/types/http/bill/getRecurringBill'

export class BillRepositoryImpl extends BillRepository {
  private billRemoteDataSource: BillRemoteDataSourceImpl
  constructor(billRemoteDataSource: BillRemoteDataSourceImpl) {
    super()
    this.billRemoteDataSource = billRemoteDataSource
  }

  createBill(request: ICreateBillRequest): Promise<ICreateBillResponse> {
    return this.billRemoteDataSource.createBill(request)
  }

  createBillSeries(request: ICreateBillSeriesRequest): Promise<ICreateBillSeriesResponse> {
    return this.billRemoteDataSource.createBillSeries(request)
  }

  createBillCategory(request: ICreateBillCategoryRequest): Promise<ICreateBillCategoryResponse> {
    return this.billRemoteDataSource.createBillCategory(request)
  }

  getAllBillCategories(request: IGetAllBillCategoriesRequest): Promise<IGetAllBillCategoriesResponse> {
    return this.billRemoteDataSource.getAllBillCategories(request)
  }

  getUpcomingBills(request: IGetUpcomingBillsRequest): Promise<IGetUpcomingBillsResponse> {
    return this.billRemoteDataSource.getUpcomingBills(request)
  }

  getBillDetail(request: IGetBillDetailRequest): Promise<IGetBillDetailResponse> {
    return this.billRemoteDataSource.getBillDetail(request)
  }

  updateBill(request: IUpdateBillRequest): Promise<IUpdateBillResponse> {
    return this.billRemoteDataSource.updateBill(request)
  }

  deleteBill(request: IDeleteBillRequest): Promise<IDeleteBillResponse> {
    return this.billRemoteDataSource.deleteBill(request)
  }

  getRecurringBills(request: IGetRecurringBillsRequest): Promise<IGetRecurringBillsResponse> {
    return this.billRemoteDataSource.getRecurringBills(request)
  }

  getRecurringBillDetail(request: IGetRecurringBillDetailRequest): Promise<IGetRecurringBillDetailResponse> {
    return this.billRemoteDataSource.getRecurringBillDetail(request)
  }

  updateBillSeries(request: IUpdateBillSeriesRequest): Promise<IUpdateBillSeriesResponse> {
    return this.billRemoteDataSource.updateBillSeries(request)
  }

  deleteBillSeries(request: IDeleteBillSeriesRequest): Promise<IDeleteBillSeriesResponse> {
    return this.billRemoteDataSource.deleteBillSeries(request)
  }
}
