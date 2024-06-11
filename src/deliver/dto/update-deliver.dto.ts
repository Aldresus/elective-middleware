import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliverDto } from './create-deliver.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeliverDto extends PartialType(CreateDeliverDto) {
  @ApiProperty({ default: '111111111111111111111111', required: false })
  id_user?: string;

  @ApiProperty({ default: '111111111111111111111111', required: false })
  id_order?: string;

  @ApiProperty({ required: false })
  rating?: number;
}
