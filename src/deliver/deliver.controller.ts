import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DeliverService } from './deliver.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';
import { DeliverEntity } from './entities/deliver.entity';
import { CreateDeliverDto } from './dto/create-deliver.dto';
import { UpdateDeliverDto } from './dto/update-deliver.dto';

@Controller('api/deliver')
@ApiTags('deliver')
export class DeliverController {
  constructor(private readonly deliverService: DeliverService) {}

  @Post()
  @ApiOperation({ summary: 'Create a delivery' })
  @ApiCreatedResponse({ type: DeliverEntity })
  @ApiBody({ type: CreateDeliverDto })
  create(@Body() createDeliverDto) {
    return this.deliverService.create(createDeliverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get deliveries with optional filters' })
  @ApiCreatedResponse({ type: DeliverEntity, isArray: true })
  @ApiQuery({ name: 'id_user', required: false, type: String })
  @ApiQuery({ name: 'id_order', required: false, type: String })
  @ApiQuery({ name: 'rating_e', required: false, type: Number })
  @ApiQuery({ name: 'rating_gt', required: false, type: Number })
  @ApiQuery({ name: 'rating_lt', required: false, type: Number })
  findAll(
    @Query('id_user') idDeliveries: string,
    @Query('id_order') idOrders: string,
    @Query('rating_e') ratingE: number,
    @Query('rating_gt') ratingGT: number,
    @Query('rating_lt') ratingLT: number,
  ) {
    return this.deliverService.findMany({
      id_user: idDeliveries,
      id_order: idOrders,
      rating_e: ratingE === undefined ? undefined : Number(ratingE),
      rating_gt: ratingGT === undefined ? undefined : Number(ratingGT),
      rating_lt: ratingLT === undefined ? undefined : Number(ratingLT),
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update delivery with ID' })
  @ApiCreatedResponse({ type: DeliverEntity })
  @ApiBody({ type: UpdateDeliverDto })
  update(
    @Param('id') id_deliver: string,
    @Body() updateDeliverDto: UpdateDeliverDto,
  ) {
    return this.deliverService.update(id_deliver, updateDeliverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete delivery with ID' })
  @ApiCreatedResponse({ type: DeliverEntity })
  remove(@Param('id') id_deliver: string) {
    return this.deliverService.remove(id_deliver);
  }
}
