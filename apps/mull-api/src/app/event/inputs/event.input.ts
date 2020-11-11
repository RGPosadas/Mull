import { EventRestriction } from '@mull/types';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Event, Media, User, Location } from '../../entities';

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

  @Field(() => MediaInput)
  image: Media;

  // TODO: Implement these with appropriate tickets
  // host: User;
  // image: Media;
  // location: Location;
  // @Field()
  // host: User;

  // @Field()
  // image: Media;

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
  // image: Media;
  // location: Location;
  // @Field()
  // image: Media;

  // @Field()
  // location: Location;
}

@InputType()
export class MediaInput implements Partial<Media> {
  @Field()
  id: number;

  @Field()
  mediaType: string;
}
