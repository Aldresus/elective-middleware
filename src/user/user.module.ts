import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { PermissionsGuard } from 'src/permission/permission.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports: [HttpModule],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    JwtService,
  ],
})
export class UserModule {}
