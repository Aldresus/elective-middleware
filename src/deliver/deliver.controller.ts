import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { DeliverService } from './deliver.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DeliverEntity } from './entities/deliver.entity';
import { CreateDeliverDto } from './dto/create-deliver.dto';
import { UpdateDeliverDto } from './dto/update-deliver.dto';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { msg } from 'config';

@Controller('api/deliver')
@ApiTags('deliver')
export class DeliverController {
  constructor(private readonly deliverService: DeliverService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Create a delivery' })
  @ApiCreatedResponse({ type: DeliverEntity })
  @ApiBody({ type: CreateDeliverDto })
  @ApiBearerAuth('access-token')
  create(@Body() createDeliverDto, @Request() req) {
    const user = req.user;
    const role = req.role;

    console.log('user', user);
    console.log('role', role);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.deliverService.create(createDeliverDto);
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Get()
  @Roles(Role.ADMIN, Role.CLIENT, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Get deliveries with optional filters' })
  @ApiCreatedResponse({ type: DeliverEntity, isArray: true })
  @ApiQuery({ name: 'id_user', required: false, type: String })
  @ApiQuery({ name: 'id_order', required: false, type: String })
  @ApiQuery({ name: 'rating_e', required: false, type: Number })
  @ApiQuery({ name: 'rating_gt', required: false, type: Number })
  @ApiQuery({ name: 'rating_lt', required: false, type: Number })
  @ApiBearerAuth('access-token')
  findAll(
    @Query('id_user') idUser: string,
    @Query('id_order') idOrders: string,
    @Query('rating_e') ratingE: number,
    @Query('rating_gt') ratingGT: number,
    @Query('rating_lt') ratingLT: number,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    console.log('user', user);
    console.log('role', role);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.deliverService.findMany({
        id_user: idUser,
        id_order: idOrders,
        rating_e: ratingE === undefined ? undefined : Number(ratingE),
        rating_gt: ratingGT === undefined ? undefined : Number(ratingGT),
        rating_lt: ratingLT === undefined ? undefined : Number(ratingLT),
      });
    }
    if (role === Role.CLIENT) {
      if (user.sub == idUser || !idUser) {
        return this.deliverService.findMany({
          id_user: user.sub,
          id_order: idOrders,
          rating_e: ratingE === undefined ? undefined : Number(ratingE),
          rating_gt: ratingGT === undefined ? undefined : Number(ratingGT),
          rating_lt: ratingLT === undefined ? undefined : Number(ratingLT),
        });
      }
    }

    throw new ForbiddenException(msg.missing_perms);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Update delivery with ID' })
  @ApiCreatedResponse({ type: DeliverEntity })
  @ApiBody({ type: UpdateDeliverDto })
  @ApiBearerAuth('access-token')
  update(
    @Param('id') id_deliver: string,
    @Body() updateDeliverDto: UpdateDeliverDto,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.deliverService.update(id_deliver, updateDeliverDto);
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.CLIENT, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Delete delivery with ID' })
  @ApiCreatedResponse({ type: DeliverEntity })
  @ApiBearerAuth('access-token')
  remove(@Param('id') id_deliver: string, @Request() req) {
    const user = req.user;
    const role = req.role;

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.deliverService.remove(id_deliver);
    }

    throw new ForbiddenException(msg.missing_perms);
  }
}
