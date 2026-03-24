import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserImageDto } from './dto/userImageDto';

@Injectable()
export class UserImagesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addUserImage(
    user_id: string,
    profile?: Express.Multer.File,
    header?: Express.Multer.File,
  ) {
    if (profile) {
      const imageDataBody: UserImageDto = {
        filename: profile.filename,
        path: profile.path.replace(/\\/g, '/'),
        type: 'Profile',
        user_id: user_id,
      };
      await this.databaseService.userImages.create({
        data: { ...imageDataBody },
      });
    }

    if (header) {
      const imageDataBody: UserImageDto = {
        filename: header.filename,
        path: header.path.replace(/\\/g, '/'),
        type: 'Header',
        user_id: user_id,
      };

      await this.databaseService.userImages.create({
        data: { ...imageDataBody },
      });
    }

    return { status: 'success' };
  }
}
