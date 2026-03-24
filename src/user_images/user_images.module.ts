import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserImagesController } from './user_images.controller';
import { UserImagesService } from './user_images.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserImagesController],
  providers: [UserImagesService],
})
export class UserImagesModule {}
