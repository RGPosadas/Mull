import { Module } from '@nestjs/common';
import { EntitiesModule } from '../entities';
import { MediaResolver } from './media.resolver';
import { MediaService } from './media.service';

@Module({
  imports: [EntitiesModule],
  providers: [MediaResolver, MediaService],
})
export class MediaModule {}
