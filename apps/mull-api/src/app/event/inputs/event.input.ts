import { EventRestriction } from '@mull/types';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Event, Location, Media } from '../../entities';
import { LocationInput } from '../../location/inputs/location.input';
import { MediaInput } from '../../media/inputs/media.input';

@InputType()
export class CreateEventInput {
  @Field()
  title?: string;

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

  @Field(/* istanbul ignore next*/ () => LocationInput)
  location: Location;
}

@InputType()
export class UpdateEventInput implements Partial<Event> {
  @Field(/* istanbul ignore next */ () => Int)
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

  @Field(/* istanbul ignore next*/ () => LocationInput)
  location?: Location;
}
