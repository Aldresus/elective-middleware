import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderProductDto {
  @ApiProperty()
  id_product: string; // the is defined because we dont create a product entry, its just an element of the array

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}
