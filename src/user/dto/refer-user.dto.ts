import { ApiProperty } from '@nestjs/swagger';

export class ReferUserDto {
  @ApiProperty({ default: '111111111111111111111111' })
  id_refer: string;
}
