import { Module } from '@nestjs/common';
import { EntitiesModule } from '../entities';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [EntitiesModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
