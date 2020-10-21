import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';
import { MediaService } from './media.service';

@Resolver('Media')
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<boolean> {
    return this.mediaService
      .saveFile(file)
      .then(() => {
        return this.mediaService.create(file.mimetype);
      })
      .then(({ id, mediaType }) => {
        this.mediaService.updateFilename(file.filename, id, mediaType);
        return true;
      })
      .catch(() => false);
  }
}
