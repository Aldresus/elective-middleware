import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliverDto {
  @ApiProperty({ default: '111111111111111111111111' })
  id_user: string;

  @ApiProperty({ default: '111111111111111111111111' })
  id_order: string;

  @ApiProperty()
  rating?: number;
}
