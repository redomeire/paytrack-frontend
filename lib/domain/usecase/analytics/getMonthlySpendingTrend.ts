import type {
  IGetMonthlySpendingTrendRequest,
  IGetMonthlySpendingTrendResponse
} from '../../../common/types/http/analytics/getMonthlySpendingTrend'
import type AnalyticsRepository from '../../repository/analyticsRepository'

export class GetMonthlySpendingTrend {
  analyticsRepository: AnalyticsRepository
  constructor(analyticsRepository: AnalyticsRepository) {
    this.analyticsRepository = analyticsRepository
  }

  async execute(request: IGetMonthlySpendingTrendRequest): Promise<IGetMonthlySpendingTrendResponse> {
    return await this.analyticsRepository.getMonthlySpendingTrend(request)
  }
}
