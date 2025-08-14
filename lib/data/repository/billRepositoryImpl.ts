import type { ICreateBillCategoryRequest, ICreateBillCategoryResponse } from '~~/lib/common/types/http/bill/createBillCategory'
import type { ICreateBillRequest, ICreateBillResponse } from '../../common/types/http/bill/createBill'
import BillRepository from '../../domain/repository/billRepository'
import type { BillRemoteDataSourceImpl } from '../datasource/billRemoteDataSource'
import type { IGetAllBillCategoriesRequest, IGetAllBillCategoriesResponse } from '~~/lib/common/types/http/bill/getAllBillCategories'

export class BillRepositoryImpl extends BillRepository {
  private billRemoteDataSource: BillRemoteDataSourceImpl
  constructor(billRemoteDataSource: BillRemoteDataSourceImpl) {
    super()
    this.billRemoteDataSource = billRemoteDataSource
  }

  createBill(request: ICreateBillRequest): Promise<ICreateBillResponse> {
    return this.billRemoteDataSource.createBill(request)
  }

  createBillCategory(request: ICreateBillCategoryRequest): Promise<ICreateBillCategoryResponse> {
    return this.billRemoteDataSource.createBillCategory(request)
  }

  getAllBillCategories(request: IGetAllBillCategoriesRequest): Promise<IGetAllBillCategoriesResponse> {
    return this.billRemoteDataSource.getAllBillCategories(request)
  }
}
