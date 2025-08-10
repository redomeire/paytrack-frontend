import type { IHttpResponse } from "../base";
import type { IUser } from "../../../../domain/entity/user";

interface IRegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  password_confirmation: string;
  language?: string;
  currency?: "IDR" | "USD";
}

type IRegisterResponse = IHttpResponse<{ user: IUser }>;

export type { IRegisterRequest, IRegisterResponse };
