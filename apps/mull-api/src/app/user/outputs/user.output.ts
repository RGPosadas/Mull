import { RelationshipType } from '@mull/types';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../entities';

@ObjectType()
export class Relationship {
  @Field(/* istanbul ignore next */ () => User)
  user: User;

  @Field(/* istanbul ignore next */ () => RelationshipType)
  type: RelationshipType;
}
