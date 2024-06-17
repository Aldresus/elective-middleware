import { ApiProperty } from '@nestjs/swagger';

export class MenuEntity {
  @ApiProperty()
  id_menu: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  menu_image_url: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  food_type: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  ids_menu_category: string[];

  @ApiProperty()
  ids_restaurant_category: string[];

  @ApiProperty()
  ids_product: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
