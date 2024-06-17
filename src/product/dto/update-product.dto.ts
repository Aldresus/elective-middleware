import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  product_image_url?: string;

  @ApiProperty({ default: '111111111111111111111111' })
  id_restaurant: string;

  @ApiProperty({ default: [] })
  ids_menus_products: string[];

  @ApiProperty({ default: [] })
  ids_menu_category: string[];

  @ApiProperty({ default: [] })
  ids_restaurant_category: string[];

  @ApiProperty()
  deleted: boolean;
}
// {
//   @ApiProperty()
//   name: string;

//   @ApiProperty()
//   price: number;

//   @ApiProperty()
//   description: string;

//   @ApiProperty()
//   product_image_url?: string;

//   @ApiProperty()
//   category: string;

//   @ApiProperty({ default: '111111111111111111111111' })
//   id_restaurant: string;

//   @ApiProperty()
//   deleted: boolean;
// }
