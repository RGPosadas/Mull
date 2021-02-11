import { Module } from '@nestjs/common';
import { EntitiesModule } from '../entities';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [EntitiesModule],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
