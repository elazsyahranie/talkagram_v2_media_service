import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  //   IsUUID,
} from 'class-validator';

export class GetAssociatedFilesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty()
  chat_ids: string[];
}
