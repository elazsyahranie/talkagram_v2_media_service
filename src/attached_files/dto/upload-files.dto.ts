import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AttachmentFileDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  ext: string;
}
