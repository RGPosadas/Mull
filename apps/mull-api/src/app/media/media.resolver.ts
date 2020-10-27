import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';
import { MediaService } from './media.service';

@Resolver('Media')
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(/* istanbul ignore next */ () => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: /* istanbul ignore next */ () => GraphQLUpload })
    file: FileUpload
  ): Promise<boolean> {
    return this.mediaService
      .saveFile(file)
      .then(() => {
        return this.mediaService.create(file.mimetype);
      })
      .then(({ id, mediaType }) => {
        return this.mediaService.updateFilename(file.filename, id, mediaType);
      })
      .catch(() => false);
  }
}
