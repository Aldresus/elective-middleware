import { Module } from '@nestjs/common';
import { UsersRestaurantsService } from './users_restaurants.service';
import { UsersRestaurantsController } from './users_restaurants.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UsersRestaurantsController],
  imports: [HttpModule],
  providers: [UsersRestaurantsService],
})
export class UsersRestaurantsModule {}
