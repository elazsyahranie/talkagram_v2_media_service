import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserImageDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
