import type { IRecipientAccount } from '../../../../domain/entity/recipient-account'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type ISetBillingInformationAsDefaultResponse = IHttpResponse<IRecipientAccount>
interface ISetBillingInformationAsDefaultRequest {
  payload: {
    id: string
  }
  options?: FetchOptions
}

export type {
  ISetBillingInformationAsDefaultResponse,
  ISetBillingInformationAsDefaultRequest
}
