import { Field, InputType } from '@nestjs/graphql';
import { Channel, EventChannel } from '../../entities';

@InputType()
export class ChannelInput implements Partial<Channel> {
  @Field()
  id: number;
}

@InputType()
export class CreateEventChannelInput implements Partial<EventChannel> {
  @Field()
  name: string;

  @Field()
  rights: number;
}
