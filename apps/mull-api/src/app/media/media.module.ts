import { Module } from '@nestjs/common';
import { MediaResolver } from './media.resolver';

@Module({
  providers: [MediaResolver],
})
export class MediaModule {}
