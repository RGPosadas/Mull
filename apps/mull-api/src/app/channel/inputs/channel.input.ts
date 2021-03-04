import { Field, InputType } from '@nestjs/graphql';
import { ArrayMaxSize } from 'class-validator';
import { Channel, DirectMessageChannel, EventChannel, User } from '../../entities';
import { UserInput } from '../../user/inputs/user.input';

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

@InputType()
export class CreateDmChannelInput implements Partial<DirectMessageChannel> {
  @Field(() => [UserInput])
  @ArrayMaxSize(2)
  participants: User[];
}
