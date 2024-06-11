import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ProductController],
  imports: [HttpModule],
  providers: [ProductService],
})
export class ProductsModule {}
