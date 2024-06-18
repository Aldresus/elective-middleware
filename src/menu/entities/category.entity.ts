import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id_category: string;

  @ApiProperty()
  ids_product: string[];     
  
  @ApiProperty()
  ids_menu: string [];           
}
