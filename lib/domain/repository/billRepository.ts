import type { ICreateBillRequest, ICreateBillResponse } from '../../common/types/http/bill/createBill'

abstract class BillRepository {
  abstract createBill(request: ICreateBillRequest): Promise<ICreateBillResponse>
}

export default BillRepository
