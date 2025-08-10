import type { IUser } from "../../../../domain/entity/user";

interface ILoginResponse {
  email: string;
  password: string;
  data: {
    user: IUser;
    token: string;
  };
}

interface ILoginRequest {
  email: string;
  password: string;
}

export type { ILoginResponse, ILoginRequest };
