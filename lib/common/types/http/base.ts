export interface IHttpResponse<T = unknown, P extends boolean = false> {
  success: boolean
  message: string
  data?: P extends true ? IPaginationData<T> : T
}

export interface IPaginationData<T> {
  current_page: number
  data: T
  first_page_url: string | null
  from: number
  last_page: number
  last_page_url: string | null
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export type KeysOf<T> = (keyof T)[]
