import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersRestaurantDto {
  @ApiProperty({ default: '111111111111111111111111' })
  id_restaurant: string;

  @ApiProperty({ default: '111111111111111111111111' })
  id_user: string;
}
