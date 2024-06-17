import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { HttpModule } from '@nestjs/axios';
import { Utils } from 'src/utils/utils';

@Module({
  controllers: [MenuController],
  imports: [HttpModule],
  providers: [MenuService, Utils],
})
export class MenuModule {}
