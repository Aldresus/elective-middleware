import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    ids_product: string[];     
    
    @ApiProperty()
    ids_menu: string [];   
}