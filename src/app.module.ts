import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuModule } from './menu/menu.module';
import { ProductsModule } from './product/product.module';
import { UsersRestaurantsModule } from './users_restaurants/users_restaurants.module';

@Module({
  imports: [
    RestaurantModule,
    MenuModule,
    ProductsModule,
    UsersRestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
