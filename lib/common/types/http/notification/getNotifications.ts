import type { INotification } from '../../../../domain/entity/notification'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IGetNotificationsResponse = IHttpResponse<INotification[]>
interface IGetNotificationsRequest {
  options?: FetchOptions
}

export type { IGetNotificationsResponse, IGetNotificationsRequest }
