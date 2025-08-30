import type { $Fetch } from 'ofetch'
import type {
  ICreateBillRequest,
  ICreateBillResponse
} from '../../common/types/http/bill/createBill'
import type {
  ICreateBillSeriesRequest,
  ICreateBillSeriesResponse
} from '../../common/types/http/bill/createBillSeries'
import type {
  ICreateBillCategoryRequest,
  ICreateBillCategoryResponse
} from '../../common/types/http/bill/createBillCategory'
import type {
  IGetAllBillCategoriesRequest,
  IGetAllBillCategoriesResponse
} from '../../common/types/http/bill/getAllBillCategories'
import type {
  IGetUpcomingBillsRequest,
  IGetUpcomingBillsResponse
} from '../../common/types/http/bill/getUpcomingBills'
import type {
  IGetRecurringBillsRequest,
  IGetRecurringBillsResponse
} from '../../common/types/http/bill/getRecurringBill'
import type {
  IGetBillDetailRequest,
  IGetBillDetailResponse
} from '../../common/types/http/bill/getBillDetail'
import type {
  IGetRecurringBillDetailRequest,
  IGetRecurringBillDetailResponse
} from '../../common/types/http/bill/getRecurringBillDetail'
import type {
  IUpdateBillRequest,
  IUpdateBillResponse
} from '../../common/types/http/bill/updateBill'
import type {
  IUpdateBillSeriesRequest,
  IUpdateBillSeriesResponse
} from '../../common/types/http/bill/updateBillSeries'
import type {
  IDeleteBillRequest,
  IDeleteBillResponse
} from '../../common/types/http/bill/deleteBill'
import type {
  IDeleteBillSeriesRequest,
  IDeleteBillSeriesResponse
} from '../../common/types/http/bill/deleteBillSeries'
import type {
  ICheckoutBillRequest,
  ICheckoutBillResponse
} from '../../common/types/http/bill/checkoutBill'

abstract class BillRemoteDataSource {
  abstract createBill(request: ICreateBillRequest): Promise<ICreateBillResponse>
  abstract createBillCategory(request: ICreateBillCategoryRequest): Promise<ICreateBillCategoryResponse>
  abstract getAllBillCategories(request: IGetAllBillCategoriesRequest): Promise<IGetAllBillCategoriesResponse>
  abstract getUpcomingBills(request: IGetUpcomingBillsRequest): Promise<IGetUpcomingBillsResponse>
  abstract getBillDetail(request: IGetBillDetailRequest): Promise<IGetBillDetailResponse>
  abstract updateBill(request: IUpdateBillRequest): Promise<IUpdateBillResponse>
  abstract deleteBill(request: IDeleteBillRequest): Promise<IDeleteBillResponse>
  abstract getRecurringBills(request: IGetRecurringBillsRequest): Promise<IGetRecurringBillsResponse>
  abstract getRecurringBillDetail(request: IGetRecurringBillDetailRequest): Promise<IGetRecurringBillDetailResponse>
  abstract createBillSeries(request: ICreateBillSeriesRequest): Promise<ICreateBillSeriesResponse>
  abstract updateBillSeries(request: IUpdateBillSeriesRequest): Promise<IUpdateBillSeriesResponse>
  abstract deleteBillSeries(request: IDeleteBillSeriesRequest): Promise<IDeleteBillSeriesResponse>
  abstract checkoutBill(request: ICheckoutBillRequest): Promise<ICheckoutBillResponse>
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

  getUpcomingBills(request: IGetUpcomingBillsRequest): Promise<IGetUpcomingBillsResponse> {
    const response = this.fetcher('/bills/', {
      ...request.options
    })
    return response
  }

  getBillDetail(request: IGetBillDetailRequest): Promise<IGetBillDetailResponse> {
    const response = this.fetcher(`/bills/${request.payload.id}`, {
      ...request.options
    })
    return response
  }

  updateBill(request: IUpdateBillRequest): Promise<IUpdateBillResponse> {
    const response = this.fetcher(`/bills/${request.payload.bill.id}`, {
      method: 'PUT',
      body: JSON.stringify(request.payload.bill),
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

  getRecurringBills(request: IGetRecurringBillsRequest): Promise<IGetRecurringBillsResponse> {
    const response = this.fetcher('/bills/series', {
      ...request.options
    })
    return response
  }

  getRecurringBillDetail(request: IGetRecurringBillDetailRequest): Promise<IGetRecurringBillDetailResponse> {
    const response = this.fetcher(`/bills/series/${request.payload.id}`, {
      ...request.options
    })
    return response
  }

  createBillSeries(request: ICreateBillSeriesRequest): Promise<ICreateBillSeriesResponse> {
    const response = this.fetcher('/bills/series', {
      method: 'POST',
      body: JSON.stringify(request.payload),
      ...request.options
    })
    return response
  }

  updateBillSeries(request: IUpdateBillSeriesRequest): Promise<IUpdateBillSeriesResponse> {
    const response = this.fetcher(`/bills/series/${request.payload.billSeries.id}`, {
      method: 'PUT',
      body: JSON.stringify(request.payload.billSeries),
      ...request.options
    })
    return response
  }

  deleteBillSeries(request: IDeleteBillSeriesRequest): Promise<IDeleteBillSeriesResponse> {
    const response = this.fetcher(`/bills/series/${request.payload.id}`, {
      method: 'DELETE',
      ...request.options
    })
    return response
  }

  checkoutBill(request: ICheckoutBillRequest): Promise<ICheckoutBillResponse> {
    const response = this.fetcher(`/payments/checkout`, {
      method: 'POST',
      body: JSON.stringify(request.payload),
      ...request.options
    })
    return response
  }
}
