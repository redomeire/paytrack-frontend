import type { IUser } from "~~/lib/domain/entity/user";

export interface ISession {
  user: IUser;
  token: string;
  loggedInAt: Date;
}
