import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AttachedFilesController } from './attached_files.controller';
import { AttachedFilesService } from './attached_files.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AttachedFilesController],
  providers: [AttachedFilesService],
})
export class AttachedFilesModule {}
