import { Field, ID, InputType } from '@nestjs/graphql';
import { Event } from '../../entities';

@InputType()
export class CreateEventInput implements Partial<Event> {
  @Field()
  title: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field()
  description: string;

  //   host: User;
  // restriction: Restriction
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
  startTime?: Date;

  @Field({ nullable: true })
  endTime?: Date;

  @Field({ nullable: true })
  description?: string;

  // restriction: Restriction
  // image: Media;
  // location: Location;
}
