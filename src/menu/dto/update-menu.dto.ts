import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  menu_image_url?: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  price: number;

  @ApiProperty({ default: '111111111111111111111111' })
  id_restaurant: string;

  @ApiProperty({ default: [] })
  ids_menu_category: string[];

  @ApiProperty({ default: [] })
  ids_restaurant_category: string[];

  @ApiProperty({ default: [] })
  ids_product: string[];
}
// {
//   @ApiProperty()
//   name: string;

//   @ApiProperty()
//   description: string;

//   @ApiProperty()
//   price: number;

//   @ApiProperty()
//   menu_image_url?: string;

//   @ApiProperty()
//   category: string;

//   @ApiProperty()
//   deleted: boolean;

//   @ApiProperty({ default: '111111111111111111111111' })
//   id_restaurant: string;

//   @ApiProperty({ default: [] })
//   ids_product: string[];

//   @ApiProperty()
//   menu_ordered_categories: string;
// }
