import type { IBillingInformation } from '../../../../domain/entity/billing-information'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type ICreateBillingInformationResponse = IHttpResponse<IBillingInformation>
interface ICreateBillingInformationRequest {
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
  ICreateBillingInformationResponse,
  ICreateBillingInformationRequest
}
