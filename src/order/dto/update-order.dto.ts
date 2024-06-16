import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { UpdateOrderMenuDto } from './update-menu.dto';
import { UpdateOrderProductDto } from './update-product.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
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

  @ApiProperty({ type: 'array' })
  menus: Array<UpdateOrderMenuDto>;

  @ApiProperty({ type: 'array' })
  products: Array<UpdateOrderProductDto>;
}
