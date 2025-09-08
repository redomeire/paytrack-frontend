import type {
  IGetNotificationsRequest,
  IGetNotificationsResponse
} from '../../../common/types/http/notification/getNotifications'
import type NotificationRepository from '../../repository/notificationRepository'

export class GetNotifications {
  notificationRepository: NotificationRepository
  constructor(notificationRepository: NotificationRepository) {
    this.notificationRepository = notificationRepository
  }

  async execute(request: IGetNotificationsRequest): Promise<IGetNotificationsResponse> {
    return this.notificationRepository.getNotifications(request)
  }
}
