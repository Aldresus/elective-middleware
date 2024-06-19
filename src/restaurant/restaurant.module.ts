import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { HttpModule } from '@nestjs/axios';
import { Utils } from 'src/utils/utils';
import { LogService } from 'src/log/log.service';

@Module({
  controllers: [RestaurantController],
  imports: [HttpModule],
  providers: [RestaurantService, Utils, LogService],
})
export class RestaurantModule {}
