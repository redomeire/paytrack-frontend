export interface IHttpResponse<T = unknown> {
  status: number;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export type KeysOf<T> = (keyof T)[];
