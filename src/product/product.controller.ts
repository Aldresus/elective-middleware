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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Utils } from 'src/utils/utils';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { CreateLogDto } from 'src/log/dto/create-log.dto';

@Controller('api/product')
@ApiTags('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly utils: Utils,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.TECHNICIAN, Role.COMMERCIAL, Role.RESTAURATEUR)
  @ApiOperation({ summary: 'Create a product' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: CreateProductDto })
  @ApiBearerAuth('access-token')
  create(@Body() createProductDto, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `post product by ${user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    return this.productService.create(createProductDto);
  }

  @Get()
  @Roles(
    Role.CLIENT,
    Role.ADMIN,
    Role.TECHNICIAN,
    Role.COMMERCIAL,
    Role.RESTAURATEUR,
    Role.DELIVERYMAN,
  )
  @ApiOperation({ summary: 'Get orders with optional filters' })
  @ApiCreatedResponse({ type: ProductEntity, isArray: true })
  @ApiQuery({ name: 'id_restaurant', required: false, type: String })
  @ApiQuery({ name: 'deleted', required: false, type: Boolean })
  @ApiBearerAuth('access-token')
  findAll(
    @Query('id_restaurant') idRestaurant: string,
    @Query('deleted') deleted: string,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `get product by ${user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    console.log(idRestaurant, deleted);
    return this.productService.findMany({
      id_restaurant: idRestaurant,
      deleted: deleted,
    });
  }

  @Get(':id')
  @Roles(
    Role.CLIENT,
    Role.ADMIN,
    Role.TECHNICIAN,
    Role.COMMERCIAL,
    Role.RESTAURATEUR,
    Role.DELIVERYMAN,
  )
  @ApiOperation({ summary: 'Get products with optional filters' })
  @ApiCreatedResponse({ type: ProductEntity, isArray: true })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  findAllProducts(@Param('id') idProduct: string, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `get by id product by ${user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    console.log(idProduct);
    return this.productService.findUnique(idProduct);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.TECHNICIAN, Role.COMMERCIAL, Role.RESTAURATEUR)
  @ApiOperation({ summary: 'Update product with ID' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: UpdateProductDto })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  update(
    @Param('id') id_product: string,
    @Body() updateProductDto,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `patch product by ${user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    return this.productService.update(id_product, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.TECHNICIAN, Role.COMMERCIAL, Role.RESTAURATEUR)
  @ApiOperation({ summary: 'Delete product with ID' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  remove(@Param('id') id_product: string, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'RESTAURANT',
      message: `delete product by ${user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    return this.productService.remove(id_product);
  }
}
