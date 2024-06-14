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
import { OrderService } from './order.service';
import {
  ApiBody,
  ApiTags,
  ApiCreatedResponse,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { msg } from 'config';

@Controller('api/order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create an order' })
  @ApiCreatedResponse({ type: OrderEntity })
  @ApiBody({ type: CreateOrderDto })
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get orders with optional filters' })
  @ApiCreatedResponse({ type: OrderEntity, isArray: true })
  @ApiQuery({ name: 'id_order', required: false, type: String })
  @ApiQuery({ name: 'id_restaurateur', required: false, type: String })
  @ApiQuery({ name: 'id_user', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  findAll(
    @Query('id_order') idOrder: string,
    @Query('id_restaurateur') idRestaurateur: string,
    @Query('id_user') idUser: string,
    @Query('status') status: string,
    @Request() req,
  ) {
    return this.orderService.findMany({
      id_order: idOrder,
      id_restaurateur: idRestaurateur,
      id_user: idUser,
      status: status,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order with ID' })
  @ApiCreatedResponse({ type: OrderEntity })
  @ApiBody({ type: UpdateOrderDto })
  update(
    @Param('id') id_order: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Request() req,
  ) {
    return this.orderService.update(id_order, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order with ID' })
  @ApiCreatedResponse({ type: UpdateOrderDto })
  remove(@Param('id') id_order: string, @Request() req) {
    return this.orderService.remove(id_order);
  }
}
