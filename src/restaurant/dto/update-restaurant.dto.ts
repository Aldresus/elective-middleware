import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  siret: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  price_range: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  banner_url: string;

  @ApiProperty()
  business_hours: string;

  @ApiProperty()
  restaurant_order_categories: string;
}
