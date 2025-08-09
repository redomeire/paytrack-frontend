import type { $Fetch } from "ofetch";
import type { IUser } from "../../domain/entity/user";

abstract class AuthRemoteDataSource {
  abstract login(email: string, password: string): Promise<string>;
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
  async login(email: string, password: string): Promise<string> {
    // Assuming the API endpoint for login is '/auth/login'
    const response = await this.fetcher("/auth/login", {
      body: JSON.stringify({ email, password }),
    });
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
