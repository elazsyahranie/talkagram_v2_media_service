import {
  Param,
  Controller,
  UseInterceptors,
  Post,
  UploadedFiles,
  // Req,
  Inject,
  Body,
  Patch,
  ValidationPipe,
  HttpCode,
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
import { MessagePattern } from '@nestjs/microservices';

@Controller('user-images')
export class UserImagesController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
    private readonly usersImageService: UserImagesService,
  ) {}
  @Post(':id')
  @HttpCode(200)
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

  @MessagePattern({ cmd: 'userImagesGetByIds' })
  async getUserImagesByIds(@Body('user_ids') user_ids: string[]) {
    return this.usersImageService.getUserImagesByIds(user_ids);
  }

  @Patch(':id')
  @HttpCode(200)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profile', maxCount: 1 },
        { name: 'header', maxCount: 1 },
      ],
      multerImageConfig('images', 'image'),
    ),
  )
  async update(
    @Body(new ValidationPipe({ whitelist: true }))
    _updatedUser: {}, // Buat "mancing" aja jadi bia files nya ada isinya
    @UploadedFiles()
    files: {
      profile?: Express.Multer.File[];
      header?: Express.Multer.File[];
    },
    @Param('id') user_id: string,
  ) {
    return this.usersImageService.updateUserImage(
      user_id,
      files?.profile?.[0],
      files?.header?.[0],
    );
  }

  @MessagePattern({ cmd: 'userImageDelete' })
  async delete(@Body() user_id: string) {
    return this.usersImageService.deleteUserImage(user_id);
  }
}
