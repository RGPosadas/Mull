import { Test, TestingModule } from '@nestjs/testing';
import { createWriteStream, renameSync, unlinkSync } from 'fs';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import { Media } from '../entities';
import { mockFile, mockMedia } from './media.mockdata';
import { MediaResolver } from './media.resolver';
import { MediaService } from './media.service';

const mockMediaService = () => ({
  create: jest.fn((mockMimeType: string) => {
    const mockFileType = mockMimeType.split('/')[1];
    const mockMedia = new Media(mockFileType);
    return mockMedia;
  }),
  saveFile: jest.fn((mockFile: FileUpload) => {
    return new Promise((resolve, reject) => {
      mockFile.createReadStream().pipe(
        createWriteStream(join(process.cwd(), `apps/mull-api/uploads/${mockFile.filename}`))
          .on('finish', () => resolve(true))
          .on('error', () => {
            reject(false);
          })
      );
    });
  }),
  uploadFile: jest.fn(() => {
    return {
      id: undefined,
      mediaType: 'jpeg',
    };
  }),
  updateFilename: jest.fn(
    (mockPrevFilename: string, mockNextFilename: number, mockFileType: string) => {
      renameSync(
        join(process.cwd(), `apps/mull-api/uploads/${mockPrevFilename}`),
        join(process.cwd(), `apps/mull-api/uploads/${mockNextFilename}.${mockFileType}`)
      );
      return true;
    }
  ),
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
    unlinkSync(`apps/mull-api/uploads/undefined.jpeg`);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should upload a file', async () => {
    const mockUploadedFile = await resolver.uploadFile(mockFile);
    expect(mockUploadedFile).toEqual(mockMedia);
  });
});
