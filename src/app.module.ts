import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuModule } from './menu/menu.module';
import { ProductsModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { DeliverModule } from './deliver/deliver.module';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from './log/log.module';
import { Utils } from './utils/utils';

@Module({
  imports: [
    RestaurantModule,
    MenuModule,
    ProductsModule,
    OrderModule,
    UserModule,
    DeliverModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
