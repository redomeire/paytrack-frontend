import type {
  IReadNotificationRequest,
  IReadNotificationResponse
} from '../../../common/types/http/notification/readNotification'
import type NotificationRepository from '../../repository/notificationRepository'

export class ReadNotification {
  notificationRepository: NotificationRepository
  constructor(notificationRepository: NotificationRepository) {
    this.notificationRepository = notificationRepository
  }

  async execute(request: IReadNotificationRequest): Promise<IReadNotificationResponse> {
    return this.notificationRepository.readNotification(request)
  }
}
