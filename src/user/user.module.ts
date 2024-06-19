import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { RolesGuard } from 'src/role/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Utils } from 'src/utils/utils';
import { LogService } from 'src/log/log.service';

@Module({
  controllers: [UserController],
  imports: [HttpModule],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtService,
    Utils,
    LogService,
  ],
})
export class UserModule {}
