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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MenuEntity } from './entities/menu.entity';

@Controller('api/menu')
@ApiTags('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create a menu' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: CreateMenuDto })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get menus with optional filters' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiQuery({ name: 'id_restaurant', required: false, type: String })
  @ApiQuery({ name: 'deleted', required: false, type: Boolean })
  findAll(
    @Query('id_restaurant') idRestaurant: string,
    @Query('deleted') deleted: string,
  ) {
    console.log(idRestaurant, deleted);
    return this.menuService.findMany(idRestaurant, deleted);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update menu with ID' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: UpdateMenuDto })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id_menu: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id_menu, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete menu with ID' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id_menu: string) {
    return this.menuService.remove(id_menu);
  }
}
