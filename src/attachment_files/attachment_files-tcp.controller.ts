import { Body, Controller, Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AttachmentFilesService } from './attachment_files.service';
import { MessagePattern } from '@nestjs/microservices';
import { AssociateFilesDto } from './dto/associate-files.dto';

@Controller('attachment-files-tcp')
export class AttachmentFilesTcpController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
    private readonly attachmentFilesService: AttachmentFilesService,
  ) {}

  @MessagePattern({ cmd: 'associateFilesWithChats' })
  async createGroup(@Body() requestBody: AssociateFilesDto) {
    const { file_ids, chat_id } = requestBody;
    const result = await this.attachmentFilesService.associateFilesWithChats(
      file_ids,
      chat_id,
    );

    this.logger.log(`${file_ids} associated with ${chat_id}`, 'MediaService');

    return result;
  }
}
