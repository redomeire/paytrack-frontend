import type {
  IGetSpendingCountByCategoryRequest,
  IGetSpendingCountByCategoryResponse
} from '../../../common/types/http/analytics/getSpendingCountByCategory'
import type AnalyticsRepository from '../../repository/analyticsRepository'

export class GetSpendingCountByCategory {
  analyticsRepository: AnalyticsRepository
  constructor(analyticsRepository: AnalyticsRepository) {
    this.analyticsRepository = analyticsRepository
  }

  async execute(request: IGetSpendingCountByCategoryRequest): Promise<IGetSpendingCountByCategoryResponse> {
    return await this.analyticsRepository.getSpendingCountByCategory(request)
  }
}
