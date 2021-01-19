import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { unlinkSync } from 'fs';
import { Media } from '../entities';
import { mockFile, mockInvalidFile, mockMedia } from './media.mockdata';
import { MediaService } from './media.service';

const mockMediaRepository = () => ({
  create: jest.fn((mockMimeType: string) => {
    const mockFileType = mockMimeType.split('/')[1];
    const mockMedia = new Media(mockFileType);
    return mockMedia;
  }),
  save: jest.fn((file: Media) => file),
});

describe('MediaService', () => {
  let service: MediaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: getRepositoryToken(Media),
          useFactory: mockMediaRepository,
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  afterAll(() => {
    unlinkSync(`apps/mull-api/uploads/0.jpeg`);
    unlinkSync(`apps/mull-api/uploads/undefined.jpeg`);
    unlinkSync(`apps/mull-api/uploads/zoro`);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload a file', async () => {
    const mockUploadedFile = await service.uploadFile(mockFile);
    expect(mockUploadedFile).toEqual(mockMedia);
  });

  it('should not upload an invalid file', async () => {
    const expectedError = new Error('Internal Server Error');
    const errorMedia = await service.uploadFile(mockInvalidFile);
    expect(errorMedia).toEqual(expectedError);
  });

  it('should create media', async () => {
    const returnedMedia = await service.createMedia(mockFile.mimetype);
    expect(returnedMedia.mediaType).toEqual(mockFile.mimetype.split('/')[1]);
  });

  it('should create a file', async () => {
    const returnedPromise = await service.saveFile(mockFile);
    expect(returnedPromise).toEqual(true);
  });

  it('should not create an invalid file', async () => {
    return await service.saveFile(mockInvalidFile).catch((error) => {
      expect(error).toEqual(false);
    });
  });

  it('should rename a file', async () => {
    const mockFileType = mockFile.mimetype.split('/')[1];
    const mockRenameFileName = service.updateFilename(mockFile.filename, 0, mockFileType);
    expect(mockRenameFileName).toEqual(true);
  });

  it('should not rename a nonexistent file', async () => {
    try {
      const mockRenameFileName = service.updateFilename('error', 0, '');
      expect(mockRenameFileName).toEqual(true);
    } catch (err) {
      expect(err.syscall).toEqual('rename');
    }
  });
});
