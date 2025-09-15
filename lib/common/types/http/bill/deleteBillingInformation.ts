import type { IRecipientAccount } from '../../../../domain/entity/recipient-account'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IDeleteBillingInformationResponse = IHttpResponse<IRecipientAccount>
interface IDeleteBillingInformationRequest {
  payload: {
    id: string
  }
  options?: FetchOptions
}

export type { IDeleteBillingInformationResponse, IDeleteBillingInformationRequest }
