import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderMenuDto } from './create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateOrderProductDto } from './update-product.dto';

export class UpdateOrderMenuDto extends PartialType(CreateOrderMenuDto) {
  @ApiProperty()
  id_menu: string; // the is defined because we dont create a menu entry, its just an element of the array

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: 'array' })
  products: Array<UpdateOrderProductDto>;
}
