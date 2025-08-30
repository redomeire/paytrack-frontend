import type {
  IGetMonthlySpendingTrendRequest,
  IGetMonthlySpendingTrendResponse
} from '../../common/types/http/analytics/getMonthlySpendingTrend'
import type {
  IGetSpendingCountByCategoryRequest,
  IGetSpendingCountByCategoryResponse
} from '../../common/types/http/analytics/getSpendingCountByCategory'

abstract class AnalyticsRepository {
  abstract getSpendingCountByCategory(request: IGetSpendingCountByCategoryRequest): Promise<IGetSpendingCountByCategoryResponse>
  abstract getMonthlySpendingTrend(request: IGetMonthlySpendingTrendRequest): Promise<IGetMonthlySpendingTrendResponse>
}

export default AnalyticsRepository
