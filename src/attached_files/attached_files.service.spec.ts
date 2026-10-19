import { Test, TestingModule } from '@nestjs/testing';
import { AttachedFilesService } from './attached_files.service';

describe('AttachedFilesService', () => {
  let service: AttachedFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttachedFilesService],
    }).compile();

    service = module.get<AttachedFilesService>(AttachedFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
