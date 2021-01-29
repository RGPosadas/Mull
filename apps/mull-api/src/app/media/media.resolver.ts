import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { Media } from '../entities';
import { MediaService } from './media.service';

@Resolver(/* istanbul ignore next */ () => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(/* istanbul ignore next */ () => Media)
  async uploadFile(
    @Args('file', { type: /* istanbul ignore next */ () => GraphQLUpload })
    file: FileUpload
  ): Promise<Media | Error> {
    return this.mediaService.uploadFile(file);
  }
}
