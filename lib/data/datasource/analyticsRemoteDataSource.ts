import type { $Fetch } from 'ofetch'
import type {
  IGetSpendingCountByCategoryRequest,
  IGetSpendingCountByCategoryResponse
} from '../../common/types/http/analytics/getSpendingCountByCategory'
import type {
  IGetMonthlySpendingTrendRequest,
  IGetMonthlySpendingTrendResponse
} from '../../common/types/http/analytics/getMonthlySpendingTrend'

abstract class AnalyticsRemoteDataSource {
  abstract getSpendingCountByCategory(request: IGetSpendingCountByCategoryRequest): Promise<IGetSpendingCountByCategoryResponse>
  abstract getMonthlySpendingTrend(request: IGetMonthlySpendingTrendRequest): Promise<IGetMonthlySpendingTrendResponse>
}

export class AnalyticsRemoteDataSourceImpl extends AnalyticsRemoteDataSource {
  private static instance: AnalyticsRemoteDataSourceImpl
  fetcher: $Fetch
  constructor(fetcher: $Fetch) {
    super()
    this.fetcher = fetcher
  }

  public static getInstance(fetcher: $Fetch): AnalyticsRemoteDataSourceImpl {
    if (!AnalyticsRemoteDataSourceImpl.instance) {
      AnalyticsRemoteDataSourceImpl.instance = new AnalyticsRemoteDataSourceImpl(fetcher)
    }
    return AnalyticsRemoteDataSourceImpl.instance
  }

  getSpendingCountByCategory(request: IGetSpendingCountByCategoryRequest): Promise<IGetSpendingCountByCategoryResponse> {
    const response = this.fetcher('/analytics/spending-by-category', {
      ...request.options
    })
    return response
  }

  getMonthlySpendingTrend(request: IGetMonthlySpendingTrendRequest): Promise<IGetMonthlySpendingTrendResponse> {
    const response = this.fetcher('/analytics/monthly-spending-trend', {
      ...request.options
    })
    return response
  }
}
