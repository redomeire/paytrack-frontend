import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IReadAllNotificationsResponse = IHttpResponse
interface IReadAllNotificationsRequest {
  options?: FetchOptions
}

export type { IReadAllNotificationsResponse, IReadAllNotificationsRequest }
