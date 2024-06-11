import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [MenuController],
  imports: [HttpModule],
  providers: [MenuService],
})
export class MenuModule {}
