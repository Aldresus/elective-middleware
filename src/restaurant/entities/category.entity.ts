import { ApiProperty } from '@nestjs/swagger';

export class RestaurantCategoryEntity {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id_restaurant_category: string;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  ids_product: string[];     
  
  @ApiProperty()
  ids_menu: string [];           
}
