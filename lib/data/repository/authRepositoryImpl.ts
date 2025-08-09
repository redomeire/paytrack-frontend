import type { IUser } from "../../domain/entity/user";
import AuthRepository from "../../domain/repository/authRepository";
import type { AuthRemoteDataSourceImpl } from "../datasource/remote";

export class AuthRepositoryImpl extends AuthRepository {
  private authRemoteDataSource: AuthRemoteDataSourceImpl;
  constructor(authRemoteDataSource: AuthRemoteDataSourceImpl) {
    super();
    this.authRemoteDataSource = authRemoteDataSource;
  }
  login(email: string, password: string): Promise<string> {
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
