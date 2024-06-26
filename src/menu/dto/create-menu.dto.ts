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
}
