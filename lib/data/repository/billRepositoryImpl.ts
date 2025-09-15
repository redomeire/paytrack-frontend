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
import type { ICheckoutBillRequest, ICheckoutBillResponse } from '~~/lib/common/types/http/bill/checkoutBill'
import type { ISetBillingInformationAsDefaultRequest, ISetBillingInformationAsDefaultResponse } from '~~/lib/common/types/http/bill/setBillingInformationAsDefault'
import type { IDeleteBillingInformationRequest, IDeleteBillingInformationResponse } from '~~/lib/common/types/http/bill/deleteBillingInformation'
import type { IUpdateBillingInformationRequest, IUpdateBillingInformationResponse } from '~~/lib/common/types/http/bill/updateBillingInformation'
import type { ICreateBillingInformationRequest, ICreateBillingInformationResponse } from '~~/lib/common/types/http/bill/createBillingInformation'
import type { IGetBillingInformationRequest, IGetBillingInformationResponse } from '~~/lib/common/types/http/bill/getBillingInformations'
import type { IGetBillingInformationDetailRequest, IGetBillingInformationDetailResponse } from '~~/lib/common/types/http/bill/getBillingInformationDetail'

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

  checkoutBill(request: ICheckoutBillRequest): Promise<ICheckoutBillResponse> {
    return this.billRemoteDataSource.checkoutBill(request)
  }

  getAllBillingInformations(request: IGetBillingInformationRequest): Promise<IGetBillingInformationResponse> {
    return this.billRemoteDataSource.getAllBillingInformations(request)
  }

  getBillingInformationDetail(request: IGetBillingInformationDetailRequest): Promise<IGetBillingInformationDetailResponse> {
    return this.billRemoteDataSource.getBillingInformationDetail(request)
  }

  createBillingInformation(request: ICreateBillingInformationRequest): Promise<ICreateBillingInformationResponse> {
    return this.billRemoteDataSource.createBillingInformation(request)
  }

  setBillingInformationAsDefault(request: ISetBillingInformationAsDefaultRequest): Promise<ISetBillingInformationAsDefaultResponse> {
    return this.billRemoteDataSource.setBillingInformationAsDefault(request)
  }

  updateBillingInformation(request: IUpdateBillingInformationRequest): Promise<IUpdateBillingInformationResponse> {
    return this.billRemoteDataSource.updateBillingInformation(request)
  }

  deleteBillingInformation(request: IDeleteBillingInformationRequest): Promise<IDeleteBillingInformationResponse> {
    return this.billRemoteDataSource.deleteBillingInformation(request)
  }
}
