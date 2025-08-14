import type { $Fetch } from 'ofetch'
import type { ICreateBillRequest, ICreateBillResponse } from '../../common/types/http/bill/createBill'
import type { ICreateBillCategoryRequest, ICreateBillCategoryResponse } from '../../common/types/http/bill/createBillCategory'
import type { IGetAllBillCategoriesRequest, IGetAllBillCategoriesResponse } from '../../common/types/http/bill/getAllBillCategories'
import type { IGetAllBillsRequest, IGetAllBillsResponse } from '../../common/types/http/bill/getAllBills'
import type { IDeleteBillRequest, IDeleteBillResponse } from '../../common/types/http/bill/deleteBIll'

abstract class BillRemoteDataSource {
  abstract createBill(request: ICreateBillRequest): Promise<ICreateBillResponse>
  abstract createBillCategory(request: ICreateBillCategoryRequest): Promise<ICreateBillCategoryResponse>
  abstract getAllBillCategories(request: IGetAllBillCategoriesRequest): Promise<IGetAllBillCategoriesResponse>
  abstract getAllBills(request: IGetAllBillsRequest): Promise<IGetAllBillsResponse>
  abstract deleteBill(request: IDeleteBillRequest): Promise<IDeleteBillResponse>
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

  getAllBills(request: IGetAllBillsRequest): Promise<IGetAllBillsResponse> {
    const response = this.fetcher('/bills', {
      ...request.options
    })
    return response
  }

  deleteBill(request: IDeleteBillRequest): Promise<IDeleteBillResponse> {
    const response = this.fetcher(`/bills/${request.payload.id}`, {
      method: 'DELETE',
      ...request.options
    })
    return response
  }
}
