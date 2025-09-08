import type { $Fetch } from 'ofetch'
import type {
  IGetNotificationsRequest,
  IGetNotificationsResponse
} from '../../common/types/http/notification/getNotifications'
import type {
  IReadNotificationRequest,
  IReadNotificationResponse
} from '../../common/types/http/notification/readNotification'
import type {
  IReadAllNotificationsRequest,
  IReadAllNotificationsResponse
} from '../../common/types/http/notification/readAllNotifications'

abstract class NotificationRemoteDataSource {
  abstract getNotifications(request: IGetNotificationsRequest): Promise<IGetNotificationsResponse>
  abstract readNotification(request: IReadNotificationRequest): Promise<IReadNotificationResponse>
  abstract readAllNotifications(request: IReadAllNotificationsRequest): Promise<IReadAllNotificationsResponse>
}

export class NotificationRemoteDataSourceImpl extends NotificationRemoteDataSource {
  private static instance: NotificationRemoteDataSourceImpl
  fetcher: $Fetch
  constructor(fetcher: $Fetch) {
    super()
    this.fetcher = fetcher
  }

  public static getInstance(fetcher: $Fetch): NotificationRemoteDataSourceImpl {
    if (!NotificationRemoteDataSourceImpl.instance) {
      NotificationRemoteDataSourceImpl.instance = new NotificationRemoteDataSourceImpl(fetcher)
    }
    return NotificationRemoteDataSourceImpl.instance
  }

  getNotifications(request: IGetNotificationsRequest): Promise<IGetNotificationsResponse> {
    const response = this.fetcher('/notification', {
      ...request.options
    })
    return response
  }

  readNotification(request: IReadNotificationRequest): Promise<IReadNotificationResponse> {
    const response = this.fetcher(`/notification/${request.payload.id}`, {
      method: 'PUT'
    })
    return response
  }

  readAllNotifications(request: IReadAllNotificationsRequest): Promise<IReadAllNotificationsResponse> {
    const response = this.fetcher('/notification/read-all', {
      method: 'PUT',
      ...request.options
    })
    return response
  }
}
