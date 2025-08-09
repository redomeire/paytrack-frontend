import type { $Fetch } from "ofetch";

import { AuthRepositoryImpl } from "~~/lib/data/repository/authRepositoryImpl";
import { AuthRemoteDataSourceImpl } from "~~/lib/data/datasource/authRemoteDataSource";

export default defineNuxtPlugin({
  name: "repositories",
  dependsOn: ["api"],
  async setup() {
    const { $api } = useNuxtApp();
    const api = $api as $Fetch;

    // register repositories
    const authRemoteDataSource = new AuthRemoteDataSourceImpl(api);

    const repositories = {
      auth: new AuthRepositoryImpl(authRemoteDataSource),
    };

    return {
      provide: {
        repositories,
      },
    };
  },
});
