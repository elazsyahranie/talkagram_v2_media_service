import { Test, TestingModule } from '@nestjs/testing';
import { AttachedFilesController } from './attached_files.controller';

describe('AttachedFilesController', () => {
  let controller: AttachedFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttachedFilesController],
    }).compile();

    controller = module.get<AttachedFilesController>(AttachedFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
