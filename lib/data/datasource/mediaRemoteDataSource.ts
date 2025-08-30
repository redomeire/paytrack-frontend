import type { $Fetch } from 'ofetch'
import type {
  IUploadMediaRequest,
  IUploadMediaResponse
} from '../../common/types/http/media/uploadMedia'

abstract class MediaRemoteDataSource {
  abstract uploadMedia(request: IUploadMediaRequest): Promise<IUploadMediaResponse>
}

export class MediaRemoteDataSourceImpl extends MediaRemoteDataSource {
  private static instance: MediaRemoteDataSourceImpl
  fetcher: $Fetch
  constructor(fetcher: $Fetch) {
    super()
    this.fetcher = fetcher
  }

  public static getInstance(fetcher: $Fetch): MediaRemoteDataSourceImpl {
    if (!MediaRemoteDataSourceImpl.instance) {
      MediaRemoteDataSourceImpl.instance = new MediaRemoteDataSourceImpl(fetcher)
    }
    return MediaRemoteDataSourceImpl.instance
  }

  uploadMedia(request: IUploadMediaRequest): Promise<IUploadMediaResponse> {
    const formData = new FormData()
    formData.append('file', request.payload.file)
    console.log('Uploading file:', formData.get('file'))

    const response = this.fetcher('/media/upload', {
      method: 'POST',
      body: formData
    })
    return response
  }
}
