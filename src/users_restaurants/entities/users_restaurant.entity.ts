import { ApiProperty } from '@nestjs/swagger';

export class UsersRestaurantEntity {
  @ApiProperty()
  id_user_restaurant: string;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  id_user: string;
}
