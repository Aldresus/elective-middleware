import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { HttpModule } from '@nestjs/axios';
import { Utils } from 'src/utils/utils';
import { LogService } from 'src/log/log.service';

@Module({
  controllers: [ProductController],
  imports: [HttpModule],
  providers: [ProductService, Utils, LogService],
})
export class ProductsModule {}
