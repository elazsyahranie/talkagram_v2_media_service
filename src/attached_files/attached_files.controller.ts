import {
  Param,
  Controller,
  UseInterceptors,
  Post,
  UploadedFiles,
  // Req,
  Inject,
  // Body,
  // Patch,
  // ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import {
  // AnyFilesInterceptor,
  //   FileFieldsInterceptor,
  // FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Logger } from 'winston';
import {
  // multerImageConfig,
  multerAttachedFilesConfig,
} from 'src/file-upload.util';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
// import { MessagePattern } from '@nestjs/microservices';
import { AttachedFilesService } from './attached_files.service';

@Controller('attached-files')
export class AttachedFilesController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
    private readonly attachedFilesService: AttachedFilesService,
  ) {}

  @Post(':id')
  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files', 10, multerAttachedFilesConfig()))
  async uploadFiles(
    // @Body() request: AttachFileDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') user_id: string,
  ) {
    const result = await this.attachedFilesService.uploadFiles(user_id, files);

    this.logger.log(
      `User ${user_id} uploaded ${files.length} files for attachment!`,
      'MediaService',
    );

    return result;
  }
}
