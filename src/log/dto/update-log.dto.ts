import { PartialType } from '@nestjs/mapped-types';
import { CreateLogDto } from './create-log.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLogDto extends PartialType(CreateLogDto) {
  @ApiProperty()
  service?: string;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  level?: string;
}
