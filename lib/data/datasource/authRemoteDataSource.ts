import type { $Fetch } from "ofetch";
import type { IUser } from "../../domain/entity/user";
import type {
  ILoginRequest,
  ILoginResponse,
} from "../../common/types/http/auth/login";

import type {
  IRegisterRequest,
  IRegisterResponse,
} from "../../common/types/http/auth/register";

abstract class AuthRemoteDataSource {
  abstract login(request: ILoginRequest): Promise<ILoginResponse>;
  abstract setUserSession(sessionData: ISession): Promise<void>;
  abstract register(request: IRegisterRequest): Promise<IRegisterResponse>;
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
  async login(request: ILoginRequest): Promise<ILoginResponse> {
    const response = await this.fetcher("/auth/login", {
      method: "POST",
      body: JSON.stringify(request),
    });
    return response;
  }
  async register(request: IRegisterRequest): Promise<IRegisterResponse> {
    const response = await this.fetcher("/auth/register", {
      method: "POST",
      body: JSON.stringify(request),
    });
    return response;
  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserInfo(): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
}
