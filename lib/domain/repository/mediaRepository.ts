import type {
  IUploadMediaRequest,
  IUploadMediaResponse
} from '../../common/types/http/media/uploadMedia'

abstract class MediaRepository {
  abstract uploadMedia(request: IUploadMediaRequest): Promise<IUploadMediaResponse>
}

export default MediaRepository
