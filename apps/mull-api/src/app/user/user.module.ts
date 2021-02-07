import { Module } from '@nestjs/common';
import { EntitiesModule } from '../entities';
import { EventService } from '../event/event.service';
import { MediaService } from '../media/media.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [EntitiesModule],
  providers: [UserResolver, UserService, EventService, MediaService],
  exports: [UserService],
})
export class UserModule {}
