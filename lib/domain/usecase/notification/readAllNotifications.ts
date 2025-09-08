import type {
  IReadAllNotificationsRequest,
  IReadAllNotificationsResponse
} from '../../../common/types/http/notification/readAllNotifications'
import type NotificationRepository from '../../repository/notificationRepository'

export class ReadAllNotifications {
  notificationRepository: NotificationRepository
  constructor(notificationRepository: NotificationRepository) {
    this.notificationRepository = notificationRepository
  }

  async execute(request: IReadAllNotificationsRequest): Promise<IReadAllNotificationsResponse> {
    return this.notificationRepository.readAllNotifications(request)
  }
}
