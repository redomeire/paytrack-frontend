import type {
  IGetSummaryRequest,
  IGetSummaryResponse
} from '../../../common/types/http/analytics/getSummary'
import type AnalyticsRepository from '../../repository/analyticsRepository'

export class GetSummary {
  analyticsRepository: AnalyticsRepository
  constructor(analyticsRepository: AnalyticsRepository) {
    this.analyticsRepository = analyticsRepository
  }

  async execute(request: IGetSummaryRequest): Promise<IGetSummaryResponse> {
    return await this.analyticsRepository.getSummary(request)
  }
}
