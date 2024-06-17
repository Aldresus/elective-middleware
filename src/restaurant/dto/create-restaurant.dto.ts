import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  siret: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  food_type: string;

  @ApiProperty()
  price_range: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  banner_url: string;

  @ApiProperty()
  business_hours: string;
}
// {
//   @ApiProperty()
//   name: string;

//   @ApiProperty()
//   siret: string;

//   @ApiProperty()
//   email: string;

//   @ApiProperty()
//   food_type: string;

//   @ApiProperty()
//   price_range: string;

//   @ApiProperty()
//   address: string;

//   @ApiProperty()
//   postal_code: string;

//   @ApiProperty()
//   city: string;

//   @ApiProperty()
//   banner_url: string;

//   @ApiProperty()
//   business_hours: string;

//   @ApiProperty()
//   restaurant_order_categories: string;
// }
