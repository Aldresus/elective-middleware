import { ApiProperty } from '@nestjs/swagger';
import { OrderMenuEntity } from './menu.entity';
import { OrderProductEntity } from './product.entity';

export class OrderEntity {
  @ApiProperty()
  id_order: string;

  @ApiProperty()
  order_date: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  restaurant_to_delivery_datetime: Date;

  @ApiProperty()
  received_datetime: Date;

  @ApiProperty()
  restaurant_accepted_datetime: Date;

  @ApiProperty()
  delivery_accepted_datetime: Date;

  @ApiProperty({ default: '111111111111111111111111' })
  id_restaurant: string;

  @ApiProperty({ default: '111111111111111111111111' })
  id_user: string;

  @ApiProperty({ type: [OrderMenuEntity] })
  menus: Array<OrderMenuEntity>;

  @ApiProperty({ type: [OrderProductEntity] })
  products: Array<OrderProductEntity>;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
