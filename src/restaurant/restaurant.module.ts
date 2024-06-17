import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { HttpModule } from '@nestjs/axios';
import { CheckUtils } from './check_utils';

@Module({
  controllers: [RestaurantController],
  imports: [HttpModule],
  providers: [RestaurantService, CheckUtils],
})
export class RestaurantModule {}
