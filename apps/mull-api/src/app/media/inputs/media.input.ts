import { Field, InputType } from '@nestjs/graphql';
import { Media } from '../../entities';

@InputType()
export class MediaInput implements Partial<Media> {
  @Field()
  id: number;

  @Field()
  mediaType: string;
}
