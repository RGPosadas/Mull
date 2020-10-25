import { ReadStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import fs = require('fs');

export const mockFile: FileUpload = {
  filename: 'zoro',
  mimetype: 'image/jpeg',
  encoding: '7bit',
  createReadStream(): ReadStream {
    return fs.createReadStream(join(process.cwd(), `apps/mull-api/uploads/mock-upload/zoro.jpeg`));
  },
};

export const mockInvalidFile: FileUpload = {
  filename: '',
  mimetype: '',
  encoding: '',
  createReadStream(): ReadStream {
    return fs.createReadStream(join(process.cwd(), `apps/mull-api/uploads/mock-upload/zoro.jpeg`));
  },
};
