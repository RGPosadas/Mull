import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get(':id')
  async getMediaById(@Param('id') id: string, @Res() res: Response) {
    const media = await this.mediaService.getMedia(parseInt(id));
    res
      .set('Content-Type', `image/${media.mediaType}`)
      .sendFile(join(process.cwd(), `apps/mull-api/uploads/${media.id}.${media.mediaType}`));
  }
}
