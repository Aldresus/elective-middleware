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
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { UserLoginDto } from './dto/login-user.dto';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { msg } from 'config';
import { log } from 'console';

@Controller('api/user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiBody({ type: UserLoginDto })
  login(@Body() signInDto: UserLoginDto) {
    return this.userService.login(signInDto.email, signInDto.password);
  }

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
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
        return this.userService.findMany({
          id: user.sub,
        });
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
  update(@Param('id') id: string, @Body() updateUserDto, @Request() req) {
    const user = req.user;
    const role = req.role;

    if (
      role === Role.ADMIN ||
      role === Role.TECHNICIAN ||
      role === Role.COMMERCIAL
    ) {
      return this.userService.update(id, updateUserDto);
    }
    if (
      role === Role.CLIENT ||
      role === Role.RESTAURATEUR ||
      role === Role.DELIVERYMAN ||
      role === Role.DEV
    ) {
      if (id === user.sub || !id) {
        return this.userService.update(user.sub, updateUserDto);
      }
    }
    throw new ForbiddenException(msg.missing_perms);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user with ID' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBearerAuth('access-token')
  remove(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const roles = req.roles;

    return this.userService.remove(id);
  }

  @Patch(':id/refer')
  @ApiOperation({ summary: 'Refer user' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: ReferUserDto })
  @ApiBearerAuth('access-token')
  updateRefer(
    @Param('id') id: string,
    @Body() referUserDto: ReferUserDto,
    @Request() req,
  ) {
    return this.userService.updateRefer(id, referUserDto);
  }

  @Delete(':id/refer')
  @ApiOperation({ summary: 'Delete user refer' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: ReferUserDto })
  @ApiBearerAuth('access-token')
  removeRefer(
    @Param('id') id: string,
    @Body() referUserDto: ReferUserDto,
    @Request() req,
  ) {
    return this.userService.removeRefer(id, referUserDto);
  }

  @Post('/:id/notifications')
  @ApiOperation({ summary: 'Create a notification' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: CreateNotificationDto })
  @ApiBearerAuth('access-token')
  createUserNotifications(
    @Param('id') id: string,
    @Body() createNotificationDto: CreateNotificationDto,
    @Request() req,
  ) {
    return this.userService.createUserNotifications(id, createNotificationDto);
  }

  @Get('/:id/notifications')
  @ApiOperation({ summary: 'Get notifications with user ID' })
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  @ApiBearerAuth('access-token')
  findUserNotifications(@Param('id') id: string, @Request() req) {
    return this.userService.findUserNotifications(id);
  }
}
