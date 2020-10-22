import { Test, TestingModule } from '@nestjs/testing';
import { Media } from '../entities';
import { mockFile } from './media.mockdata';
import { MediaResolver } from './media.resolver';
import { MediaService } from './media.service';
import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { join } from 'path';

const fs = require('fs');
const mockMediaService = () => ({
  create: jest.fn((mockMimeType: string) => {
    const mockFileType = mockMimeType.split('/')[1];
    let mockMedia = new Media(mockFileType);
    return mockMedia;
  }),
  saveFile: jest.fn((file: FileUpload) => {
    return new Promise(async (resolve, reject) => {
      file.createReadStream().pipe(
        createWriteStream(join(process.cwd(), `apps/mull-api/uploads/${file.filename}`))
          .on('finish', () => resolve(true))
          .on('error', () => {
            reject(false);
          })
      );
    });
  }),
});

describe('MediaResolver', () => {
  let resolver: MediaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaResolver,
        {
          provide: MediaService,
          useFactory: mockMediaService,
        },
      ],
    }).compile();

    resolver = module.get<MediaResolver>(MediaResolver);
  });

  afterAll(() => {
    fs.unlinkSync(`apps/mull-api/uploads/zoro`);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should upload a file', async () => {
    const mockUploadedFile = await resolver.uploadFile(mockFile);

    expect(mockUploadedFile).toEqual(false);
  });
});
