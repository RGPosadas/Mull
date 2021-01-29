import { Module } from '@nestjs/common';
import { EntitiesModule } from '../entities';
import { MediaController } from './media.controller';
import { MediaResolver } from './media.resolver';
import { MediaService } from './media.service';

@Module({
  imports: [EntitiesModule],
  providers: [MediaResolver, MediaService],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}
