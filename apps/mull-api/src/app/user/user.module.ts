import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

import { EntitiesModule } from '../entities';

@Module({
  imports: [EntitiesModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
