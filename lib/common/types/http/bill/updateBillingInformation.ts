import type { IRecipientAccount } from '../../../../domain/entity/recipient-account'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IUpdateBillingInformationResponse = IHttpResponse<IRecipientAccount>
interface IUpdateBillingInformationRequest {
  payload: {
    recipientAccount: Partial<IRecipientAccount>
  }
  options?: FetchOptions
}

export type { IUpdateBillingInformationResponse, IUpdateBillingInformationRequest }
