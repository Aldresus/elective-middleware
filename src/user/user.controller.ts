import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ForbiddenException,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ReferUserDto } from './dto/refer-user.dto';
import { UserLoginDto } from './dto/login-user.dto';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { msg } from 'config';
import { Utils } from 'src/utils/utils';
import { CreateLogDto } from 'src/log/dto/create-log.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('api/user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly utils: Utils,
  ) {}

  @ApiOperation({ summary: 'Login with credentials to get a token' })
  @Post('login')
  @ApiBody({ type: UserLoginDto })
  async login(@Body() signInDto: UserLoginDto) {
    this.utils.addLog({
      service: 'USER',
      message: `Login from ${signInDto.email}`,
      level: 'INFO',
    } as CreateLogDto);
    return this.userService.login(signInDto.email, signInDto.password);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @Post('register')
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    this.utils.addLog({
      service: 'USER',
      message: `Register from ${createUserDto.email}`,
      level: 'INFO',
    } as CreateLogDto);
    const { id_restaurant, role, id_users, ...filteredCreateUserDto } =
      createUserDto;
    return this.userService.register(filteredCreateUserDto);
  }

  @Get()
  @Roles(
    Role.ADMIN,
    Role.CLIENT,
    Role.RESTAURATEUR,
    Role.DELIVERYMAN,
    Role.COMMERCIAL,
    Role.DEV,
    Role.TECHNICIAN,
  )
  @ApiOperation({ summary: 'Get users with optional filters' })
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  @ApiQuery({ name: 'id', required: false, type: String })
  @ApiQuery({ name: 'first_name', required: false, type: String })
  @ApiQuery({ name: 'last_name', required: false, type: String })
  @ApiQuery({ name: 'role', required: false, type: String })
  @ApiBearerAuth('access-token')
  async findMany(
    @Query('id') idUser: string,
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
    @Query('role') role_filter: string,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'USER',
      message: `get by ${user.sub}id_user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.userService.findMany({
        id: idUser,
        first_name: firstName,
        last_name: lastName,
        role: role_filter,
      });
    }
    if (
      role === Role.CLIENT ||
      role === Role.RESTAURATEUR ||
      role === Role.DELIVERYMAN ||
      role === Role.DEV
    ) {
      if (idUser === user.sub || !idUser) {
        const data = await this.userService.findMany({
          id: user.sub,
        });

        const filteredData = data.map((user) => {
          const { password, createdAt, updatedAt, ...rest } = user;
          return rest;
        });

        return filteredData;
      }
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Patch(':id')
  @Roles(
    Role.ADMIN,
    Role.CLIENT,
    Role.RESTAURATEUR,
    Role.DELIVERYMAN,
    Role.COMMERCIAL,
    Role.DEV,
    Role.TECHNICIAN,
  )
  @ApiOperation({ summary: 'Update user with ID' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth('access-token')
  async update(@Param('id') id: string, @Body() updateUserDto, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'USER',
      message: `patch by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.userService.update(id, updateUserDto);
    }
    if (
      role === Role.RESTAURATEUR ||
      role === Role.DELIVERYMAN ||
      role === Role.DEV
    ) {
      if (id === user.sub || !id) {
        const { role, id_restaurant, id_users, ...filteredUpdateUserDto } =
          updateUserDto;

        const data = await this.userService.update(user.sub, updateUserDto);

        const { password, createdAt, updatedAt, ...filteredData } = data;

        return filteredData;
      }
    }
    if (role === Role.CLIENT) {
      if (id === user.sub || !id) {
        const { id_restaurant, id_users, ...filteredUpdateUserDto } =
          updateUserDto;

        if (
          filteredUpdateUserDto.role !== Role.RESTAURATEUR &&
          filteredUpdateUserDto.role !== Role.DELIVERYMAN
        ) {
          throw new ForbiddenException(msg.missing_perms);
        }

        const data = await this.userService.update(user.sub, updateUserDto);

        const { password, createdAt, updatedAt, ...filteredData } = data;

        return filteredData;
      }
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Delete(':id')
  @Roles(
    Role.ADMIN,
    Role.CLIENT,
    Role.RESTAURATEUR,
    Role.DELIVERYMAN,
    Role.COMMERCIAL,
    Role.DEV,
    Role.TECHNICIAN,
  )
  @ApiOperation({ summary: 'Delete user with ID' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBearerAuth('access-token')
  async remove(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'USER',
      message: `delete by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.userService.remove(id);
    }
    if (
      role === Role.CLIENT ||
      role === Role.RESTAURATEUR ||
      role === Role.DELIVERYMAN ||
      role === Role.DEV
    ) {
      if (id === user.sub || !id) {
        const data = await this.userService.remove(user.sub);

        const { password, createdAt, updatedAt, ...filteredData } = data;

        return filteredData;
      }
    }
    throw new ForbiddenException('Missing permissions');
  }

  @Patch(':id/refer')
  @Roles(
    Role.ADMIN,
    Role.CLIENT,
    Role.RESTAURATEUR,
    Role.DELIVERYMAN,
    Role.COMMERCIAL,
    Role.DEV,
    Role.TECHNICIAN,
  )
  @ApiOperation({ summary: 'Refer user' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: ReferUserDto })
  @ApiBearerAuth('access-token')
  async updateRefer(
    @Param('id') id: string,
    @Body() referUserDto: ReferUserDto,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'USER',
      message: `update refer by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.userService.updateRefer(id, referUserDto);
    }
    if (
      role === Role.CLIENT ||
      role === Role.RESTAURATEUR ||
      role === Role.DELIVERYMAN ||
      role === Role.DEV
    ) {
      if (id === user.sub) {
        const data = await this.userService.updateRefer(user.sub, referUserDto);

        const { password, createdAt, updatedAt, ...filteredData } = data;

        return filteredData;
      }
    }
    throw new ForbiddenException('Missing permissions');
  }

  @Delete(':id/refer')
  @Roles(
    Role.ADMIN,
    Role.CLIENT,
    Role.RESTAURATEUR,
    Role.DELIVERYMAN,
    Role.COMMERCIAL,
    Role.DEV,
    Role.TECHNICIAN,
  )
  @ApiOperation({ summary: 'Delete user refer' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: ReferUserDto })
  @ApiBearerAuth('access-token')
  async removeRefer(
    @Param('id') id: string,
    @Body() referUserDto: ReferUserDto,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'USER',
      message: `delete refer by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.userService.removeRefer(id, referUserDto);
    }

    if (
      role === Role.CLIENT ||
      role === Role.RESTAURATEUR ||
      role === Role.DELIVERYMAN ||
      role === Role.DEV
    ) {
      if (id === user.sub || !id) {
        const data = await this.userService.removeRefer(user.sub, referUserDto);

        const { password, createdAt, updatedAt, ...filteredData } = data;

        return filteredData;
      }
    }

    throw new ForbiddenException('Missing permissions');
  }

  @Post(':id/notifications')
  @Roles(Role.ADMIN, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Create a notification' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: CreateNotificationDto })
  @ApiBearerAuth('access-token')
  async createUserNotifications(
    @Param('id') id: string,
    @Body() createNotificationDto: CreateNotificationDto,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'USER',
      message: `post notification by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    const data = await this.userService.createUserNotifications(
      id,
      createNotificationDto,
    );

    return data;
  }

  @Get(':id/notifications')
  @Roles(
    Role.ADMIN,
    Role.CLIENT,
    Role.RESTAURATEUR,
    Role.DELIVERYMAN,
    Role.COMMERCIAL,
    Role.DEV,
    Role.TECHNICIAN,
  )
  @ApiOperation({ summary: 'Get notifications with user ID' })
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  @ApiBearerAuth('access-token')
  async findUserNotifications(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'USER',
      message: `get notication by ${user.sub} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.userService.findUserNotifications(id);
    }
    if (
      role === Role.CLIENT ||
      role === Role.RESTAURATEUR ||
      role === Role.DELIVERYMAN ||
      role === Role.DEV
    ) {
      if (id === user.sub || !id) {
        return this.userService.findUserNotifications(user.sub);
      }
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Patch(':id/notifications/:id_notification')
  @ApiOperation({
    summary: 'Update notification with user ID and notification ID',
  })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: UpdateNotificationDto })
  @ApiBearerAuth('access-token')
  updateUserNotifications(
    @Param('id') id: string,
    @Param('id_notification') id_notification: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.userService.updateUserNotifications(
      id,
      id_notification,
      updateNotificationDto,
    );
  }
}
