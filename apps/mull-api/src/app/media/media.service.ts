import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream, renameSync, unlinkSync } from 'fs';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import { Repository } from 'typeorm';
import { Media } from '../entities';
import { MediaInput } from './inputs/media.input';

@Injectable()
export class MediaService {
  private route = '/apps/mull-api/uploads';
  private testRoute = '/apps/mull-api/uploads/testing';
  private testing = false;

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
      throw new InternalServerErrorException();
    }

    return media;
  }

  /**
   * Delete the old file and upload new file
   * @param newFile new file to upload
   * @param oldFile old file to delete
   */
  async updateFile(newFile: FileUpload, oldFile: MediaInput): Promise<Media> {
    try {
      this.deleteStoredFile(oldFile);
      return this.uploadFile(newFile);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  saveFile({ createReadStream, filename }: FileUpload): Promise<boolean> {
    return new Promise((resolve, reject) => {
      createReadStream().pipe(
        createWriteStream(join(process.cwd(), `${this.getRoute()}/${filename}`))
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
    return this.mediaRepository.save(newMedia);
  }

  async deleteMedia(id: number): Promise<Media> {
    const media = this.getMedia(id);
    await this.mediaRepository.delete(id);
    return media;
  }

  updateFilename(prevFilename: string, nextFilename: number, fileType: string): boolean {
    renameSync(
      join(process.cwd(), `${this.getRoute()}/${prevFilename}`),
      join(process.cwd(), `${this.getRoute()}/${nextFilename}.${fileType}`)
    );
    return true;
  }

  async getMedia(mediaId: number): Promise<Media> {
    return this.mediaRepository.findOne(mediaId);
  }

  deleteStoredFile(media: MediaInput): boolean {
    unlinkSync(join(process.cwd(), `${this.getRoute()}/${media.id}.${media.mediaType}`));
    return true;
  }

  public setTesting(testing: boolean) {
    this.testing = testing;
  }

  public getRoute(): string {
    return this.testing ? this.testRoute : this.route;
  }
}
