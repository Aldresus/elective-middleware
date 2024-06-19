import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { HttpModule } from '@nestjs/axios';
import { Utils } from 'src/utils/utils';
import { LogService } from 'src/log/log.service';

@Module({
  controllers: [OrderController],
  imports: [HttpModule],
  providers: [OrderService, Utils, LogService],
})
export class OrderModule {}
