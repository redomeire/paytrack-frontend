import type { IUser } from "./user";

export interface ISession {
  user: IUser;
  token: string;
}
