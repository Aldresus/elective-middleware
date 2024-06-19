import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderMenuDto } from './create-menu.dto';
import { CreateOrderProductDto } from './create-product.dto';

export class CreateOrderDto {
  @ApiProperty()
  order_date: Date;

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

  @ApiProperty({ default: '111111111111111111111111' })
  id_restaurant: string;

  @ApiProperty({ default: '111111111111111111111111' })
  id_user: string;

  @ApiProperty({ type: 'array' })
  menus: Array<CreateOrderMenuDto>;

  @ApiProperty({ type: 'array' })
  products: Array<CreateOrderProductDto>;
}
