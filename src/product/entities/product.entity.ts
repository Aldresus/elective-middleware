import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity {
  @ApiProperty()
  id_product: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  product_image_url: string;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  ids_menu_category: string[];

  @ApiProperty()
  ids_restaurant_category: string[];

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
