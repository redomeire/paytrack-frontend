import type { IHttpResponse, KeysOf } from "../base";
import type { IUser } from "../../../../domain/entity/user";
import type { AsyncData, AsyncDataOptions, NuxtError } from "#app";

interface IRegisterRequest {
  payload: {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    password: string;
    password_confirmation: string;
    language?: string;
    currency?: "IDR" | "USD";
  };
  options?: AsyncDataOptions<
    IRegisterResponse,
    IRegisterResponse,
    KeysOf<IRegisterResponse>,
    undefined
  >;
}

type IRegisterResponse = IHttpResponse<{ user: IUser }>;

type IRegisterAsyncDataResponse = AsyncData<
  IRegisterResponse | undefined,
  NuxtError<unknown> | undefined
>;

export type { IRegisterRequest, IRegisterResponse, IRegisterAsyncDataResponse };
