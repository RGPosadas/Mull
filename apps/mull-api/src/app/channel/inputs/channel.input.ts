import { Field, InputType } from '@nestjs/graphql';
import { Channel } from '../../entities';

@InputType()
export class ChannelInput implements Partial<Channel> {
  @Field()
  id: number;
}
