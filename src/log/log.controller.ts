import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LogEntity } from './entities/log.entity';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { Utils } from 'src/utils/utils';

@Controller('api/log')
@ApiTags('log')
export class LogController {
  constructor(
    private readonly logService: LogService,
    private readonly utils: Utils,
  ) {}

  @Get()
  @Roles(Role.ADMIN, Role.COMMERCIAL, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Get logs with optional filters' })
  @ApiCreatedResponse({ type: LogEntity, isArray: true })
  @ApiQuery({ name: 'id_log', required: false, type: String })
  @ApiQuery({ name: 'service', required: false, type: String })
  @ApiQuery({ name: 'level', required: false, type: String })
  findAll(
    @Query('id_log') idLog: string,
    @Query('service') service: string,
    @Query('level') level: string,
    @Request() req,
  ) {
    const user = req.user;
    const role = req.role;

    this.utils.addLog({
      service: 'LOG',
      message: `get by ${user.id_user} (${role})`,
      level: 'INFO',
    } as CreateLogDto);

    return this.logService.findMany({
      id_log: idLog,
      service: service,
      level: level,
    });
  }
}
