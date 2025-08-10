import type { IUser } from "../../../../domain/entity/user";
import type { IHttpResponse, KeysOf } from "../base";
import type { AsyncData, AsyncDataOptions, NuxtError } from "#app";

type ILoginResponse = IHttpResponse<{
  user: IUser;
  token: string;
}>;
interface ILoginRequest {
  payload: {
    email: string;
    password: string;
  };
  options?: AsyncDataOptions<
    ILoginResponse,
    ILoginResponse,
    KeysOf<ILoginResponse>,
    undefined
  >;
}

type ILoginAsyncDataResponse = AsyncData<
  ILoginResponse | undefined,
  NuxtError<unknown> | undefined
>;

export type { ILoginResponse, ILoginRequest, ILoginAsyncDataResponse };
