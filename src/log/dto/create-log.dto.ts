import { ApiProperty } from '@nestjs/swagger';

export class CreateLogDto {
  @ApiProperty()
  service: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  level: string;
}
