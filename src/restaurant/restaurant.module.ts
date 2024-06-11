import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [RestaurantController],
  imports: [HttpModule],
  providers: [RestaurantService],
})
export class RestaurantModule {}
