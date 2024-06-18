import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { HttpModule } from '@nestjs/axios';
import { Utils } from 'src/utils/utils';

@Module({
  controllers: [RestaurantController],
  imports: [HttpModule],
  providers: [RestaurantService, Utils],
})
export class RestaurantModule {}
