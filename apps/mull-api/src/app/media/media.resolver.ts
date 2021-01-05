import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { Media } from '../entities';
import { MediaService } from './media.service';

@Resolver('Media')
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(/* istanbul ignore next */ () => Media)
  async uploadFile(
    @Args({ name: 'file', type: /* istanbul ignore next */ () => GraphQLUpload })
    file: FileUpload
  ): Promise<Media | Error> {
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
      .catch(() => {
        return new Error('Internal Server Error');
      });
  }
}
