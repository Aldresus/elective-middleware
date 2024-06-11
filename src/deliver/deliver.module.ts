import { Module } from '@nestjs/common';
import { DeliverService } from './deliver.service';
import { DeliverController } from './deliver.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [DeliverController],
  imports: [HttpModule],
  providers: [DeliverService],
})
export class DeliverModule {}
