import type { $Fetch } from 'ofetch'

import { AuthRepositoryImpl } from '~~/lib/data/repository/authRepositoryImpl'
import { BillRepositoryImpl } from '~~/lib/data/repository/billRepositoryImpl'
import { PaymentRepositoryImpl } from '~~/lib/data/repository/paymentRepositoryImpl'

import { AuthRemoteDataSourceImpl } from '~~/lib/data/datasource/authRemoteDataSource'
import { BillRemoteDataSourceImpl } from '~~/lib/data/datasource/billRemoteDataSource'
import { PaymentRemoteDataSourceImpl } from '~~/lib/data/datasource/paymentRemoteDataSource'

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

    // register repositories
    const repositories = {
      auth: new AuthRepositoryImpl(authRemoteDataSource),
      bill: new BillRepositoryImpl(billRemoteDataSource),
      payment: new PaymentRepositoryImpl(paymentRemoteDataSource)
    }

    return {
      provide: {
        repositories
      }
    }
  }
})
