import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  category: string;

  @ApiProperty({ default: '111111111111111111111111' })
  id_restaurant: string;

  @ApiProperty()
  menu_ordered_categories: string;
}
