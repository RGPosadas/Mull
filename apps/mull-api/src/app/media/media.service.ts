import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream, rename } from 'fs';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import { Repository } from 'typeorm';
import { Media } from '../entities';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>
  ) {}

  saveFile({ createReadStream, filename }: FileUpload): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      createReadStream().pipe(
        createWriteStream(join(process.cwd(), `apps/mull-api/uploads/${filename}`))
          .on('finish', () => resolve(true))
          .on('error', () => {
            reject(false);
          })
      );
    });
  }

  async create(mediaType: string): Promise<Media> {
    const fileType = mediaType.split('/')[1];
    const newMedia = this.mediaRepository.create({ mediaType: fileType });
    await this.mediaRepository.save(newMedia);
    return newMedia;
  }

  updateFilename(previousFilename: string, nextFilename: number, fileType: string) {
    rename(
      join(process.cwd(), `apps/mull-api/uploads/${previousFilename}`),
      join(process.cwd(), `apps/mull-api/uploads/${nextFilename}.${fileType}`),
      (err) => console.log(err)
    );
  }
}
