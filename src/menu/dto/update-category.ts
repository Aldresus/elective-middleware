import { ApiProperty } from '@nestjs/swagger';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';

export class UpdateCategoryDto {
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    ids_product: string[];     
    
    @ApiProperty()
    ids_menu: string [];   
}

export class UpdateProductCategoryDto {
    @ApiProperty()
    id_product: string;

    @ApiProperty()
    id_category: string;

    @ApiProperty()
    updateProductDto: UpdateProductDto;

    @ApiProperty()
    updateCategoryDto: UpdateCategoryDto;
}