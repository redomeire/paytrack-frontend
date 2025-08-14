import type { $Fetch } from 'ofetch'
import type { ICreateBillRequest, ICreateBillResponse } from '../../common/types/http/bill/createBill'
import type { ICreateBillCategoryRequest, ICreateBillCategoryResponse } from '../../common/types/http/bill/createBillCategory'
import type { IGetAllBillCategoriesRequest, IGetAllBillCategoriesResponse } from '../../common/types/http/bill/getAllBillCategories'

abstract class BillRemoteDataSource {
  abstract createBill(request: ICreateBillRequest): Promise<ICreateBillResponse>
  abstract createBillCategory(request: ICreateBillCategoryRequest): Promise<ICreateBillCategoryResponse>
  abstract getAllBillCategories(request: IGetAllBillCategoriesRequest): Promise<IGetAllBillCategoriesResponse>
}

export class BillRemoteDataSourceImpl extends BillRemoteDataSource {
  private static instance: BillRemoteDataSourceImpl
  fetcher: $Fetch
  constructor(fetcher: $Fetch) {
    super()
    this.fetcher = fetcher
  }

  public static getInstance(fetcher: $Fetch): BillRemoteDataSourceImpl {
    if (!BillRemoteDataSourceImpl.instance) {
      BillRemoteDataSourceImpl.instance = new BillRemoteDataSourceImpl(fetcher)
    }
    return BillRemoteDataSourceImpl.instance
  }

  createBill(request: ICreateBillRequest): Promise<ICreateBillResponse> {
    const response = this.fetcher('/bills', {
      method: 'POST',
      body: JSON.stringify(request.payload),
      ...request.options
    })
    return response
  }

  createBillCategory(request: ICreateBillCategoryRequest): Promise<ICreateBillCategoryResponse> {
    const response = this.fetcher('/bills/categories', {
      method: 'POST',
      body: JSON.stringify(request.payload),
      ...request.options
    })
    return response
  }

  getAllBillCategories(request: IGetAllBillCategoriesRequest): Promise<IGetAllBillCategoriesResponse> {
    const response = this.fetcher('/bills/categories', {
      ...request.options
    })
    return response
  }
}
