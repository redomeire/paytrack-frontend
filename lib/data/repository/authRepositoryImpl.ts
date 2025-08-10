import type {
  ILoginAsyncDataResponse,
  ILoginRequest,
} from "~~/lib/common/types/http/auth/login";
import type { IUser } from "../../domain/entity/user";
import AuthRepository from "../../domain/repository/authRepository";
import type { AuthRemoteDataSourceImpl } from "../datasource/authRemoteDataSource";
import type {
  IRegisterAsyncDataResponse,
  IRegisterRequest,
} from "~~/lib/common/types/http/auth/register";

export class AuthRepositoryImpl extends AuthRepository {
  private authRemoteDataSource: AuthRemoteDataSourceImpl;
  constructor(authRemoteDataSource: AuthRemoteDataSourceImpl) {
    super();
    this.authRemoteDataSource = authRemoteDataSource;
  }
  setUserSession(sessionData: ISession): Promise<void> {
    return this.authRemoteDataSource.setUserSession(sessionData);
  }
  login(request: ILoginRequest): Promise<ILoginAsyncDataResponse> {
    return this.authRemoteDataSource.login(request);
  }
  register(request: IRegisterRequest): Promise<IRegisterAsyncDataResponse> {
    return this.authRemoteDataSource.register(request);
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
