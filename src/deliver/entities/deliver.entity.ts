import { ApiProperty } from '@nestjs/swagger';

export class DeliverEntity {
  @ApiProperty()
  id_deliver: string;

  @ApiProperty()
  id_user: string;

  @ApiProperty()
  id_order: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<DeliverEntity>) {
    Object.assign(this, partial);
  }
}
