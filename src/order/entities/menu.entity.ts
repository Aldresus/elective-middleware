import { ApiProperty } from '@nestjs/swagger';
import { OrderProductEntity } from './product.entity';

export class OrderMenuEntity {
  @ApiProperty()
  id_menu: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: [OrderProductEntity] })
  products: Array<OrderProductEntity>;

  constructor(partial: Partial<OrderMenuEntity>) {
    Object.assign(this, partial);
  }
}
