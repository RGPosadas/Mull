import { Field, InputType } from '@nestjs/graphql';
import { Location, Point } from '../../entities';

@InputType()
export class PointInput implements Partial<Point> {
  @Field()
  lat: number;

  @Field()
  long: number;
}

@InputType()
export class LocationInput implements Partial<Location> {
  @Field()
  title: string;

  @Field(() => PointInput, { nullable: true })
  coordinates?: Point;

  @Field({ nullable: true })
  placeId?: string;
}
