import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [LogController],
  imports: [HttpModule],
  providers: [LogService],
})
export class LogModule {}
