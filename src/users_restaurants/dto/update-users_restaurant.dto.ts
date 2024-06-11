import { PartialType } from '@nestjs/swagger';
import { CreateUsersRestaurantDto } from './create-users_restaurant.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsersRestaurantDto extends PartialType(CreateUsersRestaurantDto) {
    @ApiProperty()
    id_restaurant: string;

    @ApiProperty()
    id_user: string;
}
