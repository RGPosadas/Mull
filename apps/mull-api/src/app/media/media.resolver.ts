import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';
import { MediaService } from './media.service';
import { Media } from '../entities';

@Resolver('Media')
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(/* istanbul ignore next */ () => Media)
  async uploadFile(
    @Args({ name: 'file', type: /* istanbul ignore next */ () => GraphQLUpload })
    file: FileUpload
  ): Promise<Media> {
    return this.mediaService
      .saveFile(file)
      .then(() => {
        return this.mediaService.create(file.mimetype);
      })
      .then((media) => {
        this.mediaService.updateFilename(file.filename, media.id, media.mediaType);
        const newMedia = new Media(media.mediaType);
        newMedia.id = media.id;
        return newMedia;
      })
      .catch((e) => {
        console.log(e);
        return null;
      });
  }
}
