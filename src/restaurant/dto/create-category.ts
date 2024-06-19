import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantCategoryDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    id_restaurant: string;   
  
    @ApiProperty()
    ids_product: string[];    
    
    @ApiProperty()
    ids_menu: string[];
}