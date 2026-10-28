import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class AssociateFilesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty()
  file_ids: string[];

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  chat_id: string;
}
