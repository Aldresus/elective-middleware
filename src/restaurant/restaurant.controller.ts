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
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantEntity } from './entities/restaurant.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/restaurant')
@ApiTags('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: CreateRestaurantDto })
  create(@Body() createRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get restaurants with optional filters' })
  @ApiCreatedResponse({ type: RestaurantEntity, isArray: true })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'city', required: false, type: String })
  @ApiQuery({ name: 'price_range', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'rating_e', required: false, type: Number })
  @ApiQuery({ name: 'rating_gt', required: false, type: Number })
  @ApiQuery({ name: 'rating_lt', required: false, type: Number })
  findMany(
    @Query('name') name: string,
    @Query('city') city: string,
    @Query('price_range') price_range: string,
    @Query('category') category: string,
    @Query('rating_e') ratingE: number,
    @Query('rating_gt') ratingGT: number,
    @Query('rating_lt') ratingLT: number,
  ) {
    return this.restaurantService.findMany({
      name,
      city,
      price_range,
      category,
      rating_e: Number(ratingE) || undefined,
      rating_gt: Number(ratingGT) || undefined,
      rating_lt: Number(ratingLT) || undefined,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: UpdateRestaurantDto })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id_restaurant: string, @Body() updateRestaurantDto) {
    return this.restaurantService.update(id_restaurant, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id_restaurant: string) {
    return this.restaurantService.remove(id_restaurant);
  }
}
