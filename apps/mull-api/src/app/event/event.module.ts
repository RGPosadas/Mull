import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities';
import { MediaModule } from '../media/media.module';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), MediaModule],
  providers: [EventService, EventResolver],
})
export class EventModule {}
