import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  order_date: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  restaurant_to_delivery_datetime: Date;

  @ApiProperty()
  received_datetime: Date;

  @ApiProperty()
  restaurant_accepted_datetime: Date;

  @ApiProperty()
  delivery_accepted_datetime: Date;

  @ApiProperty({ default: '111111111111111111111111' })
  id_restaurant: string;

  @ApiProperty({ default: '111111111111111111111111' })
  id_user: string;
}
