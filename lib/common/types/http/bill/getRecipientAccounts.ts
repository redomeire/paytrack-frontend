import type { IRecipientAccount } from '../../../../domain/entity/recipient-account'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetRecipientAccountResponse = IHttpResponse<IRecipientAccount[], true>
interface IGetRecipientAccountRequest {
  options?: FetchOptions
}

export type {
  IGetRecipientAccountResponse,
  IGetRecipientAccountRequest
}
