import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersRestaurantsService } from './users_restaurants.service';
import { CreateUsersRestaurantDto } from './dto/create-users_restaurant.dto';
import { UpdateUsersRestaurantDto } from './dto/update-users_restaurant.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { UsersRestaurantEntity } from './entities/users_restaurant.entity';

@Controller('api/user-restaurant')
@ApiTags('user-restaurant')
export class UsersRestaurantsController {
  constructor(
    private readonly usersRestaurantsService: UsersRestaurantsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a user-restaurant link' })
  @ApiCreatedResponse({ type: CreateUsersRestaurantDto })
  @ApiBody({ type: CreateUsersRestaurantDto })
  create(@Body() createUsersRestaurantDto) {
    return this.usersRestaurantsService.create(createUsersRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user-restaurant links with optional filters' })
  @ApiCreatedResponse({ type: UsersRestaurantEntity })
  @ApiQuery({ name: 'id_restaurant', required: false, type: String })
  @ApiQuery({ name: 'id_user', required: false, type: String })
  findAll(
    @Query('id_restaurant') idRestaurant: string,
    @Query('id_user') idUser: string,
  ) {
    console.log(idRestaurant, idUser);

    return this.usersRestaurantsService.findMany({
      id_restaurant: idRestaurant,
      id_user: idUser,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user-restaurant link with ID' })
  @ApiResponseProperty({ type: UpdateUsersRestaurantDto })
  @ApiBody({ type: UpdateUsersRestaurantDto })
  @ApiParam({ name: 'id', type: String })
  update(
    @Param('id') id_user_restaurant: string,
    @Body() updateUsersRestaurantDto,
  ) {
    return this.usersRestaurantsService.update(
      id_user_restaurant,
      updateUsersRestaurantDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user-restaurant link with ID' })
  @ApiCreatedResponse({ type: UsersRestaurantEntity })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id_user_restaurant: string) {
    return this.usersRestaurantsService.remove(id_user_restaurant);
  }
}
