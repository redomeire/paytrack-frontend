import type { $Fetch } from "ofetch";
import type { IUser } from "../../domain/entity/user";
import type {
  ILoginAsyncDataResponse,
  ILoginRequest,
  ILoginResponse,
} from "../../common/types/http/auth/login";

import type {
  IRegisterAsyncDataResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "../../common/types/http/auth/register";

abstract class AuthRemoteDataSource {
  abstract login(request: ILoginRequest): Promise<ILoginAsyncDataResponse>;
  abstract setUserSession(sessionData: ISession): Promise<void>;
  abstract register(
    request: IRegisterRequest
  ): Promise<IRegisterAsyncDataResponse>;
  abstract logout(): Promise<void>;
  abstract getUserInfo(): Promise<IUser>;
}

export class AuthRemoteDataSourceImpl extends AuthRemoteDataSource {
  private static instance: AuthRemoteDataSourceImpl;
  fetcher: $Fetch;
  constructor(fetcher: $Fetch) {
    super();
    this.fetcher = fetcher;
  }

  public static getInstance(fetcher: $Fetch): AuthRemoteDataSourceImpl {
    if (!AuthRemoteDataSourceImpl.instance) {
      AuthRemoteDataSourceImpl.instance = new AuthRemoteDataSourceImpl(fetcher);
    }
    return AuthRemoteDataSourceImpl.instance;
  }
  async setUserSession(sessionData: ISession): Promise<void> {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(sessionData),
    });
    console.log("Set user session response from datasource: ", response);
  }
  async login(request: ILoginRequest): Promise<ILoginAsyncDataResponse> {
    const response = await useAsyncData<ILoginResponse>(
      "login",
      () =>
        this.fetcher("/auth/login", {
          method: "POST",
          body: JSON.stringify(request.payload),
        }),
      {
        ...request.options,
      }
    );
    return response;
  }
  async register(
    request: IRegisterRequest
  ): Promise<IRegisterAsyncDataResponse> {
    const response = await useAsyncData<IRegisterResponse>("register", () =>
      this.fetcher("/auth/register", {
        method: "POST",
        body: JSON.stringify(request),
      })
    );
    return response;
  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserInfo(): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
}
