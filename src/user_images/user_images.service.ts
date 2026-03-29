import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserImageDto } from './dto/userImageDto';
import { deleteFileIfExists } from 'src/file-upload.util';

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

  async updateUserImage(
    user_id: string,
    profile?: Express.Multer.File,
    header?: Express.Multer.File,
  ) {
    if (profile) {
      const imageDataBody: UserImageDto = {
        filename: profile.filename,
        path: profile.path.replace(/\\/g, '/'),
        type: 'Profile',
        user_id,
      };

      // await this.databaseService.userImages.create({
      //   data: { ...imageDataBody },
      // });
      const findOriginalProfiles =
        await this.databaseService.userImages.findMany({
          where: { user_id, type: 'Profile' },
        });
      if (findOriginalProfiles.length) {
        const filePaths = findOriginalProfiles.map((obj) => {
          return obj.path;
        });
        deleteFileIfExists(filePaths);
      }
      // await this.databaseService.$transaction([
      //   // 'delete' only accepts unique columns
      //   // Or you can use 'composite unique key' (although we don't use it here)
      await this.databaseService.userImages.deleteMany({
        where: {
          user_id,
          type: 'Profile',
        },
      });
      console.log('Profile');
      console.dir(imageDataBody, { depth: null });
      await this.databaseService.userImages.create({
        data: { ...imageDataBody },
      });
      // ]);
    }

    if (header) {
      const imageDataBody: UserImageDto = {
        filename: header.filename,
        path: header.path.replace(/\\/g, '/'),
        type: 'Header',
        user_id,
      };

      // await this.databaseService.userImages.create({
      //   data: { ...imageDataBody },
      // });

      const findOriginalHeaders =
        await this.databaseService.userImages.findMany({
          where: { user_id, type: 'Header' },
        });

      // console.dir(findOriginalHeaders, { depth: null });

      if (findOriginalHeaders.length) {
        const filePaths = findOriginalHeaders.map((obj) => {
          return obj.path;
        });
        deleteFileIfExists(filePaths);
      }

      // await this.databaseService.$transaction([
      //   // 'delete' only accepts unique columns
      //   // Or you can use 'composite unique key' (although we don't use it here)
      await this.databaseService.userImages.deleteMany({
        where: {
          user_id,
          type: 'Header',
        },
      });
      console.log('Header');
      console.dir(imageDataBody, { depth: null });
      await this.databaseService.userImages.create({
        data: { ...imageDataBody },
      });
      // ]);
    }

    return { status: 'success' };
  }

  async deleteUserImage() {}
}
