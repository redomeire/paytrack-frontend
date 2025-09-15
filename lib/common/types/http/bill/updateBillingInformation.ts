import type { IBillingInformation } from '../../../../domain/entity/billing-information'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IUpdateBillingInformationResponse = IHttpResponse<IBillingInformation>
interface IUpdateBillingInformationRequest {
  payload: {
    recipientAccount: Partial<IBillingInformation>
  }
  options?: FetchOptions
}

export type { IUpdateBillingInformationResponse, IUpdateBillingInformationRequest }
