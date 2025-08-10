export interface IHttpResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export type KeysOf<T> = (keyof T)[];
