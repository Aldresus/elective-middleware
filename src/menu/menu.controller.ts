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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MenuEntity } from './entities/menu.entity';
import { CategoryEntity } from './entities/category.entity';
import {
  UpdateCategoryDto,
  UpdateProductCategoryDto,
} from './dto/update-category';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { Utils } from 'src/utils/utils';
import { msg } from 'config';
import { CreateCategoryDto } from './dto/create-category';
import { CreateLogDto } from 'src/log/dto/create-log.dto';

@Controller('api/menu')
@ApiTags('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly utils: Utils,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.RESTAURATEUR, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Create a menu' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: CreateMenuDto })
  @ApiBearerAuth('access-token')
  async create(@Body() createMenuDto: CreateMenuDto, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `post menu by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.menuService.create(createMenuDto);
    }
    if (role === Role.RESTAURATEUR) {
      const restaurateur = (
        await this.utils.getUserByID({
          id: user.sub,
        })
      )[0];

      console.log('RESTAURATEUR: ', restaurateur);
      console.log('CREATE MENU DTO: ', createMenuDto);

      if (restaurateur.id_restaurant === createMenuDto.id_restaurant) {
        return this.menuService.create(createMenuDto);
      }
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Post('category')
  @Roles(
    Role.ADMIN,
    Role.RESTAURATEUR,
    Role.COMMERCIAL,
    Role.TECHNICIAN,
    Role.CLIENT,
    Role.DEV,
    Role.DELIVERYMAN,
  )
  @ApiOperation({ summary: 'Create a category' })
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiBody({ type: CreateCategoryDto })
  @ApiBearerAuth('access-token')
  createCategory(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `post menu category by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    return this.menuService.createCategory(createCategoryDto);
  }

  @Get(':id')
  /**@Roles(
    Role.ADMIN,
    Role.RESTAURATEUR,
    Role.COMMERCIAL,
    Role.TECHNICIAN,
    Role.CLIENT,
    Role.DEV,
    Role.DELIVERYMAN,
  )*/
  @ApiOperation({ summary: 'Get menu with ID' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  async getById(@Param('id') id_menu: string, @Request() req) {
    /**const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `get by id menu by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);*/

    return this.menuService.getById(id_menu);

    /**if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.menuService.getById(id_menu);
    }
    if (role === Role.RESTAURATEUR) {
      const data = await this.menuService.getById(id_menu);

      const { id_restaurant, ...rest } = data;

      return rest;
    }
    if (
      role === Role.CLIENT ||
      role === Role.DEV ||
      role === Role.DELIVERYMAN
    ) {
      return this.menuService.getById(id_menu);
    }

    return this.menuService.getById(id_menu);*/
  }

  @Get()
  @Roles(
    Role.ADMIN,
    Role.RESTAURATEUR,
    Role.COMMERCIAL,
    Role.TECHNICIAN,
    Role.CLIENT,
    Role.DEV,
    Role.DELIVERYMAN,
  )
  @ApiOperation({ summary: 'Get menus with optional filters' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiQuery({ name: 'id_restaurant', required: false, type: String })
  @ApiBearerAuth('access-token')
  async findAll(@Query('id_restaurant') idRestaurant: string, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `get menu by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.menuService.findMany(idRestaurant);
    }
    if (
      role === Role.RESTAURATEUR ||
      role === Role.CLIENT ||
      role === Role.DEV ||
      role === Role.DELIVERYMAN
    ) {
      const data = await this.menuService.findMany(idRestaurant);

      const { createdAt, updatedAt, ...rest } = data;

      return rest;
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Patch('productCategory')
  @Roles(
    Role.ADMIN,
    Role.RESTAURATEUR,
    Role.COMMERCIAL,
    Role.TECHNICIAN,
    Role.CLIENT,
    Role.DEV,
    Role.DELIVERYMAN,
  )
  @ApiOperation({ summary: 'Update menu category with ID' })
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiBody({ type: UpdateProductCategoryDto })
  @ApiBearerAuth('access-token')
  updateCategory(
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `patch menu category by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    return this.menuService.updateCategory(updateProductCategoryDto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.RESTAURATEUR, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Update menu with ID' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: UpdateMenuDto })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  async update(
    @Param('id') id_menu: string,
    @Body() updateMenuDto: UpdateMenuDto,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `patch menu by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.menuService.update(id_menu, updateMenuDto);
    }
    if (role === Role.RESTAURATEUR) {
      const data = await this.menuService.getById(id_menu);
      const restaurateur = (
        await this.utils.getUserByID({
          id: user.sub,
        })
      )[0];

      console.log('DATA PATCH: ', data);
      console.log('RESTAURATEUR: ', restaurateur);

      if (restaurateur.id_restaurant === data.id_restaurant) {
        return this.menuService.update(id_menu, updateMenuDto);
      }
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.RESTAURATEUR, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Delete menu with ID' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  async remove(@Param('id') id_menu: string, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `delete menu by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.menuService.remove(id_menu);
    }
    if (role === Role.RESTAURATEUR) {
      const data = await this.menuService.getById(id_menu);
      const restaurateur = (
        await this.utils.getUserByID({
          id: user.sub,
        })
      )[0];

      if (data.id_restaurant === restaurateur.id_restaurant) {
        return this.menuService.remove(id_menu);
      }
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Delete('category/:id')
  @Roles(
    Role.ADMIN,
    Role.RESTAURATEUR,
    Role.COMMERCIAL,
    Role.TECHNICIAN,
    Role.CLIENT,
    Role.DEV,
    Role.DELIVERYMAN,
  )
  @ApiOperation({ summary: 'Delete category with ID' })
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  removeCategory(@Param('id') id_category: string, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `delete menu category by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    return this.menuService.removeCategory(id_category);
  }
}
