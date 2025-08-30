import type {
  IGetSummaryRequest,
  IGetSummaryResponse
} from '../../common/types/http/analytics/getSummary'
import type {
  IGetMonthlySpendingTrendRequest,
  IGetMonthlySpendingTrendResponse
} from '../../common/types/http/analytics/getMonthlySpendingTrend'
import type {
  IGetSpendingCountByCategoryRequest,
  IGetSpendingCountByCategoryResponse
} from '../../common/types/http/analytics/getSpendingCountByCategory'

abstract class AnalyticsRepository {
  abstract getSummary(request: IGetSummaryRequest): Promise<IGetSummaryResponse>
  abstract getSpendingCountByCategory(request: IGetSpendingCountByCategoryRequest): Promise<IGetSpendingCountByCategoryResponse>
  abstract getMonthlySpendingTrend(request: IGetMonthlySpendingTrendRequest): Promise<IGetMonthlySpendingTrendResponse>
}

export default AnalyticsRepository
