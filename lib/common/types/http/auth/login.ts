import type { IUser } from "../../../../domain/entity/user";
import type { IHttpResponse } from "../base";

interface ILoginRequest {
  email: string;
  password: string;
}

type ILoginResponse = IHttpResponse<{
  user: IUser;
  token: string;
}>;

export type { ILoginResponse, ILoginRequest };
