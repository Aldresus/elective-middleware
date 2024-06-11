import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [OrderController],
  imports: [HttpModule],
  providers: [OrderService],
})
export class OrderModule {}
