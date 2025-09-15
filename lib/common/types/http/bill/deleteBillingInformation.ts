import type { IBillingInformation } from '../../../../domain/entity/billing-information'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IDeleteBillingInformationResponse = IHttpResponse<IBillingInformation>
interface IDeleteBillingInformationRequest {
  payload: {
    id: string
  }
  options?: FetchOptions
}

export type { IDeleteBillingInformationResponse, IDeleteBillingInformationRequest }
