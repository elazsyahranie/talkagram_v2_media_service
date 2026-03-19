import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user-images')
export class UserImagesController {
  @MessagePattern({ cmd: 'userImagesAdd' })
  async addUserImage() {
    console.log('-userImagesAdd-');
    // const result = await this.usersService.login(request);
    return {
      status: 'success',
    };
  }
}
