import {
  Param,
  Controller,
  UseInterceptors,
  Post,
  UploadedFiles,
  Inject,
} from '@nestjs/common';
// import { MessagePattern } from '@nestjs/microservices';
import {
  // AnyFilesInterceptor,
  FileFieldsInterceptor,
  // FileInterceptor,
} from '@nestjs/platform-express';
import { Logger } from 'winston';
import { multerImageConfig } from 'src/file-upload.util';
import { UserImagesService } from './user_images.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('user-images')
export class UserImagesController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
    private readonly usersImageService: UserImagesService,
  ) {}
  @Post(':id')
  // @MessagePattern({ cmd: 'userImagesAdd' })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profile', maxCount: 1 },
        { name: 'header', maxCount: 1 },
      ],
      multerImageConfig('images', 'image'),
    ),
  )
  async addUserImage(
    @UploadedFiles()
    files: {
      profile?: Express.Multer.File[];
      header?: Express.Multer.File[];
    },
    @Param('id') user_id: string,
  ) {
    await this.usersImageService.addUserImage(
      user_id,
      files.profile ? files.profile[0] : undefined,
      files.header ? files.header[0] : undefined,
    );

    this.logger.log(`User ${user_id} image added!`, 'UsersService');

    return {
      status: 'success',
    };
  }
}
