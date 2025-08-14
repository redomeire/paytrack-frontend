import type { $Fetch } from 'ofetch'
import type { ICreateBillRequest, ICreateBillResponse } from '../../common/types/http/bill/createBill'

abstract class BillRemoteDataSource {
  abstract createBill(request: ICreateBillRequest): Promise<ICreateBillResponse>
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
}
