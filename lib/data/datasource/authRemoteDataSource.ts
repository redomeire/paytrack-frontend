import type { $Fetch } from "ofetch";
import type { IUser } from "../../domain/entity/user";

abstract class AuthRemoteDataSource {
  abstract login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
    data: { user: IUser; token: string };
  }>;
  abstract setUserSession(sessionData: ISession): Promise<void>;
  abstract logout(): Promise<void>;
  abstract isAuthenticated(): Promise<boolean>;
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
  async login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
    data: { user: IUser; token: string };
  }> {
    // Assuming the API endpoint for login is '/auth/login'
    const response = await this.fetcher("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    console.log("Login response from datasource: ", response);
    return response;
  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  isAuthenticated(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getUserInfo(): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
}
