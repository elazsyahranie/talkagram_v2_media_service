import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AttachmentFileDto } from './dto/upload-files.dto';
import { v4 as uuidv4 } from 'uuid';
import { SUCCESS } from 'src/common/constants/app.constants';

@Injectable()
export class AttachmentFilesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async uploadFiles(user_id: string, files: Express.Multer.File[]) {
    const toBeUploaded: AttachmentFileDto[] = [];
    const imageIds: string[] = [];

    files.map((obj) => {
      const image_id = uuidv4();
      imageIds.push(image_id);

      const ext = obj.filename.split('.')[obj.filename.split('.').length - 1];
      toBeUploaded.push({
        id: image_id,
        sender: user_id,
        filename: obj.filename,
        path: obj.path.replace(/\\/g, '/'),
        ext,
      });
    });

    await this.databaseService.attachedFiles.createMany({
      data: toBeUploaded,
    });

    return imageIds;
  }

  async associateFilesWithChats(file_ids: string[], chat_id: string) {
    const findFiles = await this.databaseService.attachedFiles.findMany({
      where: { id: { in: file_ids } },
    });

    /* Associate those files with the "chat_id" */
    if (findFiles.length) {
      await this.databaseService.attachedFiles.updateMany({
        where: { id: { in: file_ids } },
        data: { chat_id },
      });
    }

    return SUCCESS;
  }
}
