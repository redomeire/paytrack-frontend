import type { IBillingInformation } from '../../../../domain/entity/billing-information'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetBillingInformationDetailResponse = IHttpResponse<IBillingInformation>
interface IGetBillingInformationDetailRequest {
  payload: {
    id: string
  }
  options?: FetchOptions
}

export type { IGetBillingInformationDetailResponse, IGetBillingInformationDetailRequest }
