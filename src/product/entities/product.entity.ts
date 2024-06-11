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
  category: string;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
