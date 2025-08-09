import type { IUser } from "../../domain/entity/user";
import AuthRepository from "../../domain/repository/authRepository";
import type { AuthRemoteDataSourceImpl } from "../datasource/authRemoteDataSource";

export class AuthRepositoryImpl extends AuthRepository {
  private authRemoteDataSource: AuthRemoteDataSourceImpl;
  constructor(authRemoteDataSource: AuthRemoteDataSourceImpl) {
    super();
    this.authRemoteDataSource = authRemoteDataSource;
  }
  setUserSession(sessionData: ISession): Promise<void> {
    return this.authRemoteDataSource.setUserSession(sessionData);
  }
  login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
    data: { user: IUser; token: string };
  }> {
    return this.authRemoteDataSource.login(email, password);
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
