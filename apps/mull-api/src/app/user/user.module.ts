import { Module } from '@nestjs/common';
import { EntitiesModule } from '../entities';
import { EventService } from '../event/event.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [EntitiesModule],
  providers: [UserResolver, UserService, EventService],
  exports: [UserService],
})
export class UserModule {}
