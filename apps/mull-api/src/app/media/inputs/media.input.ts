import { Media } from '../../entities';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MediaInput implements Partial<Media> {
  @Field()
  id: number;

  @Field()
  mediaType: string;
}
