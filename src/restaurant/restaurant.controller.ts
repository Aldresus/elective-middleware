import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantEntity } from './entities/restaurant.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { msg } from 'config';
import { Utils } from 'src/utils/utils';
import { RestaurantCategoryEntity } from './entities/category.entity';
import { CreateRestaurantCategoryDto } from './dto/create-category';
import {
  AddMenuInCategoryDto,
  AddProductInCategoryDto,
} from './dto/update-category';
import { CreateLogDto } from 'src/log/dto/create-log.dto';

@Controller('api/restaurant')
@ApiTags('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly utils: Utils,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.RESTAURATEUR, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: CreateRestaurantDto })
  @ApiBearerAuth('access-token')
  async create(@Body() createRestaurantDto, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `post by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.restaurantService.create(createRestaurantDto, user.sub);
    }

    if (role === Role.RESTAURATEUR) {
      const restaurateur = (
        await this.utils.getUserByID({
          id: user.sub,
        })
      )[0];

      if (restaurateur.id_restaurant !== '000000000000000000000000') {
        throw new ForbiddenException(msg.restaurant_already_created);
      }

      const newRestaurant =
        await this.restaurantService.create(createRestaurantDto);

      // update user with restaurant ID
      await this.utils.setUserRestaurantID(user.sub, {
        id_restaurant: newRestaurant.id_restaurant,
      });

      return newRestaurant;
    }
  }

  @Post('restaurantCategory')
  @ApiOperation({ summary: 'Create a restaurant category' })
  @ApiCreatedResponse({ type: RestaurantCategoryEntity })
  @ApiBody({ type: CreateRestaurantCategoryDto })
  createCategory(
    @Body() createRestaurantCategoryDto: CreateRestaurantCategoryDto,
  ) {
    return this.restaurantService.createCategory(createRestaurantCategoryDto);
  }

  @Get()
  /**@Roles(
    Role.ADMIN,
    Role.CLIENT,
    Role.RESTAURATEUR,
    Role.DELIVERYMAN,
    Role.COMMERCIAL,
    Role.DEV,
    Role.TECHNICIAN,
  )*/
  @ApiOperation({ summary: 'Get restaurants with optional filters' })
  @ApiCreatedResponse({ type: RestaurantEntity, isArray: true })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'city', required: false, type: String })
  @ApiQuery({ name: 'price_range', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'rating_e', required: false, type: Number })
  @ApiQuery({ name: 'rating_gt', required: false, type: Number })
  @ApiQuery({ name: 'rating_lt', required: false, type: Number })
  @ApiBearerAuth('access-token')
  async findMany(
    @Query('name') name: string,
    @Query('city') city: string,
    @Query('price_range') price_range: string,
    @Query('category') category: string,
    @Query('rating_e') ratingE: number,
    @Query('rating_gt') ratingGT: number,
    @Query('rating_lt') ratingLT: number,
    @Request() req,
  ) {
    /**const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `get by ${user.sub}`,
      level: 'INFO',
    } as CreateLogDto);

    console.log('Role:', role);*/

    return this.restaurantService.findMany({
      name,
      city,
      price_range,
      category,
      rating_e: Number(ratingE) || undefined,
      rating_gt: Number(ratingGT) || undefined,
      rating_lt: Number(ratingLT) || undefined,
    });

    /**if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
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
    if (role === Role.RESTAURATEUR) {
      const data = await this.restaurantService.findMany({
        name,
        city,
        price_range,
        category,
        rating_e: Number(ratingE) || undefined,
        rating_gt: Number(ratingGT) || undefined,
        rating_lt: Number(ratingLT) || undefined,
      });

      const restaurateur = (
        await this.utils.getUserByID({
          id: user.sub,
        })
      )[0];

      const filteredData = data.map((restaurant) => {
        if (restaurant.id_restaurant === restaurateur.id_restaurant) {
          return restaurant;
        }
        const { siret, createdAt, updatedAt, ...rest } = restaurant;
        return rest;
      });

      return filteredData;
    }
    if (
      role === Role.CLIENT ||
      role === Role.DELIVERYMAN ||
      role === Role.DEV
    ) {
      const data = await this.restaurantService.findMany({
        name,
        city,
        price_range,
        category,
        rating_e: Number(ratingE) || undefined,
        rating_gt: Number(ratingGT) || undefined,
        rating_lt: Number(ratingLT) || undefined,
      });

      const filteredData = data.map((restaurant) => {
        const { siret, createdAt, updatedAt, ...rest } = restaurant;
        return rest;
      });

      return filteredData;
    }
    throw new ForbiddenException(msg.missing_perms);*/
  }

  @Get(':id')
  /**@Roles(
    Role.ADMIN,
    Role.CLIENT,
    Role.RESTAURATEUR,
    Role.DELIVERYMAN,
    Role.COMMERCIAL,
    Role.DEV,
    Role.TECHNICIAN,
  )*/
  @ApiOperation({ summary: 'Get restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  async findById(@Param('id') id_restaurant: string, @Request() req) {
    /**const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `get by id by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    console.log('Role:', role);*/

    return this.restaurantService.findById(id_restaurant);

    /**if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.restaurantService.findById(id_restaurant);
    }
    if (role === Role.RESTAURATEUR) {
      console.log('Role:', role);
      const data = await this.restaurantService.findById(id_restaurant);

      const restaurateur = (
        await this.utils.getUserByID({
          id: user.sub,
        })
      )[0];

      if (data.id_restaurant === restaurateur.id_restaurant) {
        const { createdAt, updatedAt, ...rest } = data;
        return rest;
      }

      const { siret, createdAt, updatedAt, ...rest } = data;
      return rest;
    }
    if (
      role === Role.CLIENT ||
      role === Role.DELIVERYMAN ||
      role === Role.DEV
    ) {
      const data = await this.restaurantService.findById(id_restaurant);

      const { siret, createdAt, updatedAt, ...rest } = data;
      return rest;
    }
    throw new ForbiddenException(msg.missing_perms);*/
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiParam({ name: 'id', type: String })
  findByUserId(@Param('id') id_user: string) {
    return this.restaurantService.findByUserId(id_user);
  }

  @Patch('addProductCategory')
  @ApiOperation({ summary: 'Update menu category with ID' })
  @ApiCreatedResponse({ type: RestaurantCategoryEntity })
  @ApiBody({ type: AddProductInCategoryDto })
  addProductCategory(@Body() addProductInCategoryDto: AddProductInCategoryDto) {
    return this.restaurantService.addProductCategory(addProductInCategoryDto);
  }

  @Patch('addMenuCategory')
  @ApiOperation({ summary: 'Update menu category with ID' })
  @ApiCreatedResponse({ type: RestaurantCategoryEntity })
  @ApiBody({ type: AddMenuInCategoryDto })
  addMenuCategory(@Body() addMenuInCategoryDto: AddMenuInCategoryDto) {
    return this.restaurantService.addMenuCategory(addMenuInCategoryDto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.RESTAURATEUR, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Update restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: UpdateRestaurantDto })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  async update(
    @Param('id') id_restaurant: string,
    @Body() updateRestaurantDto,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `patch by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.restaurantService.update(id_restaurant, updateRestaurantDto);
    } else if (role === Role.RESTAURATEUR) {
      const restaurateur = (
        await this.utils.getUserByID({
          id: user.sub,
        })
      )[0];

      console.log('Restaurateur:', restaurateur);

      if (id_restaurant === restaurateur.id_restaurant) {
        console.log('Restaurateur ID user:', restaurateur.id_restaurant);
        console.log('ID:', id_restaurant);
        return this.restaurantService.update(
          id_restaurant,
          updateRestaurantDto,
        );
      }
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.RESTAURATEUR, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Delete restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  async remove(@Param('id') id_restaurant: string, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `delete by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.restaurantService.remove(id_restaurant);
    } else if (role === Role.RESTAURATEUR) {
      const restaurateur = (
        await this.utils.getUserByID({
          id: user.sub,
        })
      )[0];

      if (id_restaurant === restaurateur.id_restaurant) {
        return this.restaurantService.remove(id_restaurant);
      }
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Delete('category/:id')
  @ApiOperation({ summary: 'Delete category with ID' })
  @ApiCreatedResponse({ type: RestaurantCategoryEntity })
  @ApiParam({ name: 'id', type: String })
  removeCategory(@Param('id') id_restaurant_category: string) {
    return this.restaurantService.removeCategory(id_restaurant_category);
  }
}
