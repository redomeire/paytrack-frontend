import type { INotification } from '../../../../domain/entity/notification'
import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IReadNotificationResponse = IHttpResponse<{
  notification: INotification
}>
interface IReadNotificationRequest {
  payload: {
    id: string
  }
  options?: FetchOptions
}

export type { IReadNotificationResponse, IReadNotificationRequest }
