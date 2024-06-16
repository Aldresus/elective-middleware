import { ApiProperty } from '@nestjs/swagger';

export class OrderProductEntity {
  @ApiProperty()
  id_product: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  constructor(partial: Partial<OrderProductEntity>) {
    Object.assign(this, partial);
  }
}
