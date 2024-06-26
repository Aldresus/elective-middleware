import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './role.decorator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { msg } from 'config';
import { Utils } from 'src/utils/utils';
import { CreateLogDto } from 'src/log/dto/create-log.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    private utils: Utils,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('URL:', context.switchToHttp().getRequest().url);
    console.log('URL:', context.switchToHttp().getRequest().method);
    console.log('RequiredRoles:', requiredRoles);

    const url = context.switchToHttp().getRequest().url;
    const method = context.switchToHttp().getRequest().method;

    this.utils.addLog({
      service: 'MIDDLEWARE',
      message: `[${method}] ${url}`,
      level: 'INFO',
    } as CreateLogDto);

    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    // // REMOVE FOR PRODUCTION
    // request.role = 'ADMIN';
    // return true;
    // // REMOVE FOR PRODUCTION
    if (!requiredRoles) {
      console.log('No required roles');
      return true;
    }

    console.log('authorizationHeader:', authorizationHeader);

    if (!authorizationHeader) {
      // If no authorization header, deny access
      throw new ForbiddenException(msg.missing_token);
    }

    const token = authorizationHeader.replace('Bearer ', '');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      console.log(payload);

      request.user = payload; // Attach the payload to the request object

      // Check if user has the required roles
      const hasRequiredRole = requiredRoles.some((role) =>
        payload.role.includes(role),
      );

      if (!hasRequiredRole) {
        console.log('User does not have the required role');
        throw new ForbiddenException(msg.missing_required_role);
      }

      // Attach roles to the request for later use
      request.role = payload.role;
      return true;
    } catch (error) {
      console.log(error);
      console.log('Invalid token');
      throw new ForbiddenException(msg.invalid_token);
    }
  }
}
