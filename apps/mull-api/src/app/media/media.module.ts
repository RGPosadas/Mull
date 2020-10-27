import { Module } from '@nestjs/common';
import { MediaResolver } from './media.resolver';
import { MediaService } from './media.service';
import { EntitiesModule } from '../entities';

@Module({
  imports: [EntitiesModule],
  providers: [MediaResolver, MediaService],
})
export class MediaModule {}
