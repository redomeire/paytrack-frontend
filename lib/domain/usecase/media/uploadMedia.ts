import type {
  IUploadMediaRequest,
  IUploadMediaResponse
} from '../../../common/types/http/media/uploadMedia'
import type MediaRepository from '../../repository/mediaRepository'

export class UploadMedia {
  mediaRepository: MediaRepository
  constructor(mediaRepository: MediaRepository) {
    this.mediaRepository = mediaRepository
  }

  async execute(request: IUploadMediaRequest): Promise<IUploadMediaResponse> {
    return this.mediaRepository.uploadMedia(request)
  }
}
