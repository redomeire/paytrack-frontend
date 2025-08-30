import type { IGetSummaryRequest, IGetSummaryResponse } from '~~/lib/common/types/http/analytics/getSummary'
import type {
  IGetMonthlySpendingTrendRequest,
  IGetMonthlySpendingTrendResponse
} from '../../common/types/http/analytics/getMonthlySpendingTrend'
import type {
  IGetSpendingCountByCategoryRequest,
  IGetSpendingCountByCategoryResponse
} from '../../common/types/http/analytics/getSpendingCountByCategory'
import AnalyticsRepository from '../../domain/repository/analyticsRepository'
import type { AnalyticsRemoteDataSourceImpl } from '../datasource/analyticsRemoteDataSource'

export class AnalyticsRepositoryImpl extends AnalyticsRepository {
  private analyticsRemoteDataSource: AnalyticsRemoteDataSourceImpl
  constructor(analyticsRemoteDataSource: AnalyticsRemoteDataSourceImpl) {
    super()
    this.analyticsRemoteDataSource = analyticsRemoteDataSource
  }

  getSummary(request: IGetSummaryRequest): Promise<IGetSummaryResponse> {
    return this.analyticsRemoteDataSource.getSummary(request)
  }

  getSpendingCountByCategory(request: IGetSpendingCountByCategoryRequest): Promise<IGetSpendingCountByCategoryResponse> {
    return this.analyticsRemoteDataSource.getSpendingCountByCategory(request)
  }

  getMonthlySpendingTrend(request: IGetMonthlySpendingTrendRequest): Promise<IGetMonthlySpendingTrendResponse> {
    return this.analyticsRemoteDataSource.getMonthlySpendingTrend(request)
  }
}
