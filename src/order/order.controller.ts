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
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { msg } from 'config';
import { Status } from 'src/order/order.status.enum';
import { Utils } from 'src/utils/utils';
import { CreateLogDto } from 'src/log/dto/create-log.dto';

@Controller('api/order')
@ApiTags('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly utils: Utils,
  ) {}

  @Post()
  @Roles(Role.CLIENT, Role.ADMIN, Role.TECHNICIAN, Role.COMMERCIAL)
  @ApiOperation({ summary: 'Create an order' })
  @ApiCreatedResponse({ type: OrderEntity })
  @ApiBody({ type: CreateOrderDto })
  @ApiBearerAuth('access-token')
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'ORDER',
      message: `post by ${user.id_user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.orderService.create(createOrderDto);
    }
    if (role === Role.CLIENT) {
      if (user.sub === createOrderDto.id_user || !createOrderDto.id_user) {
        createOrderDto.id_user = user.sub;
        createOrderDto.status = Status.CREATED;

        return this.orderService.create(createOrderDto);
      }
    }
    throw new ForbiddenException(msg.missing_perms);
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
  @ApiOperation({ summary: 'Get order with ID' })
  @ApiCreatedResponse({ type: OrderEntity })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiBearerAuth('access-token')
  async findById(@Param('id') id_order: string, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'ORDER',
      message: `get by id by ${user.id_user}id_user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.orderService.findById(id_order);
    }
    if (role === Role.CLIENT) {
      const data = await this.orderService.findById(id_order);

      if (data.id_user === user.sub) {
        return data;
      }
    }
    if (role === Role.RESTAURATEUR) {
      const data = await this.orderService.findById(id_order);
      const restaurateur = (
        await this.utils.getUserByID({
          id: user.sub,
        })
      )[0];

      if (data.id_restaurant === restaurateur.id_restaurant) {
        return data;
      }
    }
    if (role === Role.DELIVERYMAN) {
      const userDeliveries = await this.utils.findDeliveriesByIdUser({
        id_user: user.sub,
      });

      console.log(userDeliveries);

      for (const delivery of userDeliveries) {
        if (delivery.id_order === id_order) {
          return this.orderService.findById(id_order);
        }
      }
    }

    throw new ForbiddenException(msg.missing_perms);
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
  @ApiCreatedResponse({ type: OrderEntity, isArray: true })
  @ApiQuery({ name: 'id_order', required: false, type: String })
  @ApiQuery({ name: 'id_restaurateur', required: false, type: String })
  @ApiQuery({ name: 'id_user', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiBearerAuth('access-token')
  async findAll(
    @Query('id_order') idOrder: string,
    @Query('id_restaurateur') idRestaurateur: string,
    @Query('id_user') idUser: string,
    @Query('status') status: string,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'ORDER',
      message: `get by ${user.id_user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.orderService.findMany({
        id_order: idOrder,
        id_restaurateur: idRestaurateur,
        id_user: idUser,
        status: status,
      });
    }
    if (role === Role.CLIENT) {
      const data = await this.orderService.findMany({
        id_order: idOrder,
        id_restaurateur: idRestaurateur,
        id_user: idUser,
        status: status,
      });

      const filteredOrders = [];

      for (const order of data) {
        if (order.id_user === user.sub) {
          filteredOrders.push(order);
        }
      }

      return filteredOrders;
    }
    if (role === Role.RESTAURATEUR) {
      const data = await this.orderService.findMany({
        id_order: idOrder,
        id_restaurateur: idRestaurateur,
        id_user: idUser,
        status: status,
      });
      console.log(data.length);
      const restaurateur = (
        await this.utils.getUserByID({
          id: user.sub,
        })
      )[0];

      const filteredOrders = [];

      for (const order of data) {
        if (order.id_restaurant === restaurateur.id_restaurant) {
          console.log(order.id_restaurant, restaurateur.id_restaurant);
          filteredOrders.push(order);
        }
      }

      console.log(filteredOrders.length);

      return filteredOrders;
    }
    if (role === Role.DELIVERYMAN) {
      console.log('herrrr');
      const userDeliveries = await this.utils.findDeliveriesByIdUser({
        id_user: user.sub,
      });

      const orders = await this.orderService.findMany({
        id_order: idOrder,
        id_restaurateur: idRestaurateur,
        id_user: idUser,
        status: status,
      });

      const filteredOrders = [];

      // Parcourir chaque delivery et vérifier si le id_order existe dans les orders
      for (const delivery of userDeliveries) {
        const matchingOrder = orders.find(
          (order) => order.id_order === delivery.id_order,
        );
        if (matchingOrder) {
          filteredOrders.push(matchingOrder);
        }
      }

      return filteredOrders;
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Patch(':id')
  @Roles(
    Role.CLIENT,
    Role.ADMIN,
    Role.TECHNICIAN,
    Role.COMMERCIAL,
    Role.RESTAURATEUR,
    Role.DELIVERYMAN,
  )
  @ApiOperation({ summary: 'Update order with ID' })
  @ApiCreatedResponse({ type: OrderEntity })
  @ApiBody({ type: UpdateOrderDto })
  @ApiBearerAuth('access-token')
  async update(
    @Param('id') id_order: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'ORDER',
      message: `patch by ${user.id_user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.orderService.update(id_order, updateOrderDto);
    }

    if (role === Role.CLIENT) {
      if (updateOrderDto.id_user === user.sub || !updateOrderDto.id_user) {
        updateOrderDto.id_user == user.sub;
        return this.orderService.update(id_order, updateOrderDto);
      }
    }

    if (role === Role.RESTAURATEUR) {
      const order = await this.orderService.findById(id_order);
      const restaurateur = (
        await this.utils.getUserByID({
          id: user.sub,
        })
      )[0];
      if (restaurateur.id_restaurant === order.id_restaurant) {
        return this.orderService.update(id_order, updateOrderDto);
      }
    }

    if (role === Role.DELIVERYMAN) {
      const userDeliveries = await this.utils.findDeliveriesByIdUser({
        id_user: user.sub,
      });

      for (const delivery of userDeliveries) {
        if (id_order === delivery.id_order) {
          return this.orderService.update(id_order, updateOrderDto);
        }
      }
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Delete(':id')
  @Roles(Role.CLIENT, Role.ADMIN, Role.TECHNICIAN, Role.COMMERCIAL)
  @ApiOperation({ summary: 'Delete order with ID' })
  @ApiCreatedResponse({ type: UpdateOrderDto })
  @ApiBearerAuth('access-token')
  async remove(@Param('id') id_order: string, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'ORDER',
      message: `delete by ${user.id_user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.orderService.remove(id_order);
    }

    if (role === Role.CLIENT) {
      const order = await this.orderService.findById(id_order);

      if (order.id_user === user.sub) {
        return this.orderService.remove(id_order);
      }
    }

    throw new ForbiddenException(msg.missing_perms);
  }
}
