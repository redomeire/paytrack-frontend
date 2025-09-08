import type { $Fetch } from 'ofetch'

import { AuthRepositoryImpl } from '~~/lib/data/repository/authRepositoryImpl'
import { BillRepositoryImpl } from '~~/lib/data/repository/billRepositoryImpl'
import { PaymentRepositoryImpl } from '~~/lib/data/repository/paymentRepositoryImpl'
import { MediaRepositoryImpl } from '~~/lib/data/repository/mediaRepositoryImpl'
import { AnalyticsRepositoryImpl } from '~~/lib/data/repository/analyticsRepositoryImpl'
import { NotificationRepositoryImpl } from '~~/lib/data/repository/notificationRepositoryImpl'

import { AuthRemoteDataSourceImpl } from '~~/lib/data/datasource/authRemoteDataSource'
import { BillRemoteDataSourceImpl } from '~~/lib/data/datasource/billRemoteDataSource'
import { PaymentRemoteDataSourceImpl } from '~~/lib/data/datasource/paymentRemoteDataSource'
import { MediaRemoteDataSourceImpl } from '~~/lib/data/datasource/mediaRemoteDataSource'
import { AnalyticsRemoteDataSourceImpl } from '~~/lib/data/datasource/analyticsRemoteDataSource'
import { NotificationRemoteDataSourceImpl } from '~~/lib/data/datasource/notificationRemoteDataSource'

export default defineNuxtPlugin({
  name: 'repositories',
  dependsOn: ['api'],
  async setup() {
    const { $api } = useNuxtApp()
    const api = $api as $Fetch

    // register data sources
    const authRemoteDataSource = new AuthRemoteDataSourceImpl(api)
    const billRemoteDataSource = new BillRemoteDataSourceImpl(api)
    const paymentRemoteDataSource = new PaymentRemoteDataSourceImpl(api)
    const mediaRemoteDataSource = new MediaRemoteDataSourceImpl(api)
    const analyticsRemoteDataSource = new AnalyticsRemoteDataSourceImpl(api)
    const notificationRemoteDataSource = new NotificationRemoteDataSourceImpl(api)

    // register repositories
    const repositories = {
      auth: new AuthRepositoryImpl(authRemoteDataSource),
      bill: new BillRepositoryImpl(billRemoteDataSource),
      payment: new PaymentRepositoryImpl(paymentRemoteDataSource),
      media: new MediaRepositoryImpl(mediaRemoteDataSource),
      analytics: new AnalyticsRepositoryImpl(analyticsRemoteDataSource),
      notification: new NotificationRepositoryImpl(notificationRemoteDataSource)
    }

    return {
      provide: {
        repositories
      }
    }
  }
})
