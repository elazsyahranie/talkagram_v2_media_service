import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AttachmentFilesController } from './attached_files.controller';
import { AttachmentFilesService } from './attached_files.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AttachmentFilesController],
  providers: [AttachmentFilesService],
})
export class AttachedFilesModule {}
