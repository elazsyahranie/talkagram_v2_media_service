import { Test, TestingModule } from '@nestjs/testing';
import { AttachmentFilesTcpController } from './attachment_files-tcp.controller';

describe('AttachmentFilesTcpController', () => {
  let controller: AttachmentFilesTcpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttachmentFilesTcpController],
    }).compile();

    controller = module.get<AttachmentFilesTcpController>(AttachmentFilesTcpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
