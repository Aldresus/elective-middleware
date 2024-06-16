import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderProductDto } from './create-product.dto';

export class CreateOrderMenuDto {
  @ApiProperty()
  id_menu: string; // the is defined because we dont create a menu entry, its just an element of the array

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: 'array' })
  products: Array<CreateOrderProductDto>;
}
