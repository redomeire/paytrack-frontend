import type { IReadAllNotificationsRequest, IReadAllNotificationsResponse } from '~~/lib/common/types/http/notification/readAllNotifications'
import type {
  IGetNotificationsRequest,
  IGetNotificationsResponse
} from '../../common/types/http/notification/getNotifications'
import type { IReadNotificationRequest, IReadNotificationResponse } from '../../common/types/http/notification/readNotification'

abstract class NotificationRepository {
  abstract getNotifications(request: IGetNotificationsRequest): Promise<IGetNotificationsResponse>
  abstract readNotification(request: IReadNotificationRequest): Promise<IReadNotificationResponse>
  abstract readAllNotifications(request: IReadAllNotificationsRequest): Promise<IReadAllNotificationsResponse>
}

export default NotificationRepository
