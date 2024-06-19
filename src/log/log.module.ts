import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { HttpModule } from '@nestjs/axios';
import { Utils } from 'src/utils/utils';

@Module({
  controllers: [LogController],
  imports: [HttpModule],
  providers: [LogService, Utils],
})
export class LogModule {}
