import type { IBillingInformation } from '../../../../domain/entity/billing-information'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type ISetBillingInformationAsDefaultResponse = IHttpResponse<IBillingInformation>
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
