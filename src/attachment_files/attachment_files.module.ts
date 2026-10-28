import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AttachmentFilesController } from './attachment_files.controller';
import { AttachmentFilesService } from './attachment_files.service';
import { AttachmentFilesTcpController } from './attachment_files-tcp.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AttachmentFilesController, AttachmentFilesTcpController],
  providers: [AttachmentFilesService],
})
export class AttachmentFilesModule {}
