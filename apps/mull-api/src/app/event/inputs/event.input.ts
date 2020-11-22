import { EventRestriction } from '@mull/types';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Event, Media } from '../../entities';
import { MediaInput } from '../../media/inputs/media.input';

@InputType()
export class CreateEventInput implements Partial<Event> {
  @Field()
  title: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  description: string;

  @Field(/* istanbul ignore next */ () => Int)
  restriction: EventRestriction;

  @Field(/* istanbul ignore next */ () => MediaInput)
  image: Media;

  // TODO: Implement these with appropriate tickets
  // @Field()
  // host: User;

  // @Field()
  // location: Location;
}
@InputType()
export class UpdateEventInput implements Partial<Event> {
  @Field(/* istanbul ignore next */ () => ID)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  description?: string;

  @Field(/* istanbul ignore next */ () => Int, { nullable: true })
  restriction: EventRestriction;

  // TODO: Implement these with appropriate tickets
  // @Field()
  // image: Media;

  // @Field()
  // location: Location;
}
