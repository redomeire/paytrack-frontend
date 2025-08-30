import MediaRepository from '../../domain/repository/mediaRepository'
import type { MediaRemoteDataSourceImpl } from '../datasource/mediaRemoteDataSource'

import type {
  IUploadMediaRequest,
  IUploadMediaResponse
} from '../../common/types/http/media/uploadMedia'

export class MediaRepositoryImpl extends MediaRepository {
  private mediaRemoteDataSource: MediaRemoteDataSourceImpl
  constructor(mediaRemoteDataSource: MediaRemoteDataSourceImpl) {
    super()
    this.mediaRemoteDataSource = mediaRemoteDataSource
  }

  uploadMedia(request: IUploadMediaRequest): Promise<IUploadMediaResponse> {
    return this.mediaRemoteDataSource.uploadMedia(request)
  }
}
