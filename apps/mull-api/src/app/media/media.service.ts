import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream, renameSync, unlinkSync } from 'fs';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import { Repository } from 'typeorm';
import { Media } from '../entities';
import { MediaInput } from './inputs/media.input';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>
  ) {}

  async uploadFile(file: FileUpload): Promise<Media> {
    try {
      await this.saveFile(file);
      var media = await this.createMedia(file.mimetype);
      this.updateFilename(file.filename, media.id, media.mediaType);
    } catch (err) {
      throw new Error('Internal Server Error');
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

  async getMedia(mediaId: number): Promise<Media> {
    return await this.mediaRepository.findOne(mediaId);
  }

  deleteStoredMedia(media: MediaInput): boolean {
    unlinkSync(join(process.cwd(), `/apps/mull-api/uploads/${media.id}.${media.mediaType}`));
    return true;
  }

  /**
   * Delete the old media and upload new media (while keeping the same mediaId)
   * @param newMedia new media to upload
   * @param oldMedia old media to delete
   */
  async updateMedia(newMedia: FileUpload, oldMedia: MediaInput): Promise<Media> {
    const mediaIdToKeep = oldMedia.id;
    try {
      this.deleteStoredMedia(oldMedia);
      await this.saveFile(newMedia);
      const newMediaType = newMedia.mimetype.split('/')[1];
      this.updateFilename(newMedia.filename, mediaIdToKeep, newMediaType);
      if (oldMedia.mediaType != newMediaType) {
        await this.mediaRepository.update(mediaIdToKeep, { mediaType: newMediaType });
      }
    } catch (err) {
      throw new Error('Internal Server Error');
    }
    return this.getMedia(mediaIdToKeep);
  }
}
