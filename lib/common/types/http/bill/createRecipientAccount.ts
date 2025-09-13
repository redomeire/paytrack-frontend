import type { IRecipientAccount } from '../../../../domain/entity/recipient-account'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type ICreateRecipientAccountResponse = IHttpResponse<IRecipientAccount>
interface ICreateRecipientAccountRequest {
  options?: FetchOptions
  payload: {
    name: string
    type: 'BANK_ACCOUNT' | 'EWALLET'
    default: boolean
    account_number: string
    details: string
  }
}

export type {
  ICreateRecipientAccountResponse,
  ICreateRecipientAccountRequest
}
