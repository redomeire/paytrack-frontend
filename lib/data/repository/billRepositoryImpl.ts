import type { ICreateBillRequest, ICreateBillResponse } from '../../common/types/http/bill/createBill'
import BillRepository from '../../domain/repository/billRepository'
import type { BillRemoteDataSourceImpl } from '../datasource/billRemoteDataSource'

export class BillRepositoryImpl extends BillRepository {
  private billRemoteDataSource: BillRemoteDataSourceImpl
  constructor(billRemoteDataSource: BillRemoteDataSourceImpl) {
    super()
    this.billRemoteDataSource = billRemoteDataSource
  }

  createBill(request: ICreateBillRequest): Promise<ICreateBillResponse> {
    return this.billRemoteDataSource.createBill(request)
  }
}
