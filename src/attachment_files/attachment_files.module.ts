import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AttachmentFilesController } from './attachment_files.controller';
import { AttachmentFilesService } from './attachment_files.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AttachmentFilesController],
  providers: [AttachmentFilesService],
})
export class AttachmentFilesModule {}
