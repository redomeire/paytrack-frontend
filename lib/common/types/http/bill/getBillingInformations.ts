import type { IBillingInformation } from '../../../../domain/entity/billing-information'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetBillingInformationResponse = IHttpResponse<IBillingInformation[], true>
interface IGetBillingInformationRequest {
  options?: FetchOptions
}

export type {
  IGetBillingInformationResponse,
  IGetBillingInformationRequest
}
