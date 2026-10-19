import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AttachFileDto } from './dto/upload-files.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AttachedFilesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async uploadFiles(user_id: string, files: Express.Multer.File[]) {
    const toBeUploaded: AttachFileDto[] = [];
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

    return { status: 'success', imageIds };
  }
}
