import { createReadStream, ReadStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import { Media } from '../entities/media.entity';
import { MediaInput } from './inputs/media.input';

export const mockFileJPEG: FileUpload = {
  filename: 'zoro',
  mimetype: 'image/jpeg',
  encoding: '7bit',
  createReadStream(): ReadStream {
    /* istanbul ignore next */
    return createReadStream(join(process.cwd(), `apps/mull-api/uploads/mock-upload/zoro.jpeg`));
  },
};

export const mockFilePNG: FileUpload = {
  filename: 'luffy',
  mimetype: 'image/png',
  encoding: '7bit',
  createReadStream(): ReadStream {
    /* istanbul ignore next */
    return createReadStream(join(process.cwd(), `apps/mull-api/uploads/mock-upload/luffy.png`));
  },
};

export const mockInvalidFile: FileUpload = {
  filename: '',
  mimetype: '',
  encoding: '',
  createReadStream(): ReadStream {
    /* istanbul ignore next */
    return createReadStream(join(process.cwd(), `apps/mull-api/uploads/mock-upload/zoro.jpeg`));
  },
};

export const mockMediaInput: MediaInput = {
  id: 2,
  mediaType: 'png',
};

export const mockAllMedias: Media[] = [
  {
    id: 1,
    mediaType: 'jpeg',
    post: null,
  },
  { id: 2, mediaType: 'jpeg', post: null },
];
