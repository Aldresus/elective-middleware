import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  menu_image_url: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  ids_menu_category: string[];

  @ApiProperty()
  ids_restaurant_category: string[];

  @ApiProperty()
  ids_product: string[];
}

// {
//   @ApiProperty()
//   name: string;

//   @ApiProperty()
//   description: string;

//   @ApiProperty()
//   menu_image_url?: string;

//   @ApiProperty()
//   price: number;

//   @ApiProperty()
//   category: string;

//   @ApiProperty({ default: '111111111111111111111111' })
//   id_restaurant: string;

//   @ApiProperty()
//   ids_product: string[];

//   @ApiProperty()
//   menu_ordered_categories: string;
// }
