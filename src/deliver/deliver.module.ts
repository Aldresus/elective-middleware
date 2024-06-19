import { Module } from '@nestjs/common';
import { DeliverService } from './deliver.service';
import { DeliverController } from './deliver.controller';
import { HttpModule } from '@nestjs/axios';
import { Utils } from 'src/utils/utils';
import { LogService } from 'src/log/log.service';

@Module({
  controllers: [DeliverController],
  imports: [HttpModule],
  providers: [DeliverService, Utils, LogService],
})
export class DeliverModule {}
