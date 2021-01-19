import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream, renameSync } from 'fs';
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

  async uploadFile(file: FileUpload): Promise<Media | Error> {
    try {
      await this.saveFile(file);
      var media = await this.createMedia(file.mimetype);
      this.updateFilename(file.filename, media.id, media.mediaType);
    } catch (err) {
      return new Error('Internal Server Error');
    }

    return media;
  }

  saveFile({ createReadStream, filename }: FileUpload): Promise<boolean> {
    return new Promise((resolve, reject) => {
      createReadStream().pipe(
        createWriteStream(join(process.cwd(), `/apps/mull-api/uploads/${filename}`))
          .on('finish', () => resolve(true))
          .on('error', () => {
            reject(false);
          })
      );
    });
  }

  async createMedia(mediaType: string): Promise<Media> {
    const fileType = mediaType.split('/')[1];
    const newMedia = new Media(fileType);
    return await this.mediaRepository.save(newMedia);
  }

  updateFilename(prevFilename: string, nextFilename: number, fileType: string): boolean {
    renameSync(
      join(process.cwd(), `/apps/mull-api/uploads/${prevFilename}`),
      join(process.cwd(), `/apps/mull-api/uploads/${nextFilename}.${fileType}`)
    );
    return true;
  }
}
