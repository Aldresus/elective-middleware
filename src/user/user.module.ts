import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UserController],
  imports: [HttpModule],
  providers: [UserService],
})
export class UserModule {}
