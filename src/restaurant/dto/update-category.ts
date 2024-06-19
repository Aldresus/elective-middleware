import { ApiProperty } from '@nestjs/swagger';

export class UpdateRestaurantCategoryDto {
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    ids_product: string[];
    
    @ApiProperty()
    ids_menu: string[];
    
    @ApiProperty()
    id_restaurant: string;   
}

export class AddProductInCategoryDto {
    @ApiProperty()
    id_restaurant_category: string;

    @ApiProperty()
    updateCategoryDto: UpdateRestaurantCategoryDto;
}

export class AddMenuInCategoryDto {
    @ApiProperty()
    id_restaurant_category: string;

    @ApiProperty()
    updateCategoryDto: UpdateRestaurantCategoryDto;
}