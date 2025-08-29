import type { IHttpResponse } from '../base'
import type { FetchOptions } from 'ofetch'

type IUploadMediaResponse = IHttpResponse<{ url: string }, false>
interface IUploadMediaRequest {
  payload: {
    file: File
  }
  options?: FetchOptions
}

export type { IUploadMediaResponse, IUploadMediaRequest }
