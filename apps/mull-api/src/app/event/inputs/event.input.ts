import { EventRestriction } from '@mull/types';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Event } from '../../entities';

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

  @Field()
  restriction: EventRestriction;

  //   host: User;
  // image: Media;
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

  @Field({ nullable: true })
  restriction: EventRestriction;
  // image: Media;
  // location: Location;
}
