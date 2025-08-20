import type { $Fetch } from 'ofetch'

import { AuthRepositoryImpl } from '~~/lib/data/repository/authRepositoryImpl'
import { BillRepositoryImpl } from '~~/lib/data/repository/billRepositoryImpl'

import { AuthRemoteDataSourceImpl } from '~~/lib/data/datasource/authRemoteDataSource'
import { BillRemoteDataSourceImpl } from '~~/lib/data/datasource/billRemoteDataSource'

export default defineNuxtPlugin({
  name: 'repositories',
  dependsOn: ['api'],
  async setup() {
    const { $api } = useNuxtApp()
    const api = $api as $Fetch

    // register repositories
    const authRemoteDataSource = new AuthRemoteDataSourceImpl(api)
    const billRemoteDataSource = new BillRemoteDataSourceImpl(api)

    const repositories = {
      auth: new AuthRepositoryImpl(authRemoteDataSource),
      bill: new BillRepositoryImpl(billRemoteDataSource)
    }

    return {
      provide: {
        repositories
      }
    }
  }
})
