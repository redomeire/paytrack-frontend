import type { IReadAllNotificationsRequest, IReadAllNotificationsResponse } from '~~/lib/common/types/http/notification/readAllNotifications'
import type {
  IGetNotificationsRequest,
  IGetNotificationsResponse
} from '../../common/types/http/notification/getNotifications'
import type { IReadNotificationRequest, IReadNotificationResponse } from '../../common/types/http/notification/readNotification'
import NotificationRepository from '../../domain/repository/notificationRepository'
import type { NotificationRemoteDataSourceImpl } from '../datasource/notificationRemoteDataSource'

export class NotificationRepositoryImpl extends NotificationRepository {
  private notificationRemoteDataSource: NotificationRemoteDataSourceImpl
  constructor(notificationRemoteDataSource: NotificationRemoteDataSourceImpl) {
    super()
    this.notificationRemoteDataSource = notificationRemoteDataSource
  }

  getNotifications(request: IGetNotificationsRequest): Promise<IGetNotificationsResponse> {
    return this.notificationRemoteDataSource.getNotifications(request)
  }

  readNotification(request: IReadNotificationRequest): Promise<IReadNotificationResponse> {
    return this.notificationRemoteDataSource.readNotification(request)
  }

  readAllNotifications(request: IReadAllNotificationsRequest): Promise<IReadAllNotificationsResponse> {
    return this.notificationRemoteDataSource.readAllNotifications(request)
  }
}
