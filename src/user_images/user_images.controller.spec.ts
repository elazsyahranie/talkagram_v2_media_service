import { Test, TestingModule } from '@nestjs/testing';
import { UserImagesController } from './user_images.controller';

describe('UserImagesController', () => {
  let controller: UserImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserImagesController],
    }).compile();

    controller = module.get<UserImagesController>(UserImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
