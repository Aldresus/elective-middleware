import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './role.decorator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      // if no roles are required, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      // If no authorization header, deny access
      return false;
    }

    const token = authorizationHeader.replace('Bearer ', '');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      request.user = payload; // Attach the payload to the request object

      // Check if user has the required roles
      const hasRequiredRole = requiredRoles.some((role) =>
        payload.role.roles.includes(role),
      );

      if (!hasRequiredRole) {
        return false;
      }

      // Attach roles to the request for later use
      request.roles = payload.role.roles;
      return true;
    } catch {
      // If token is invalid, deny access
      return false;
    }
  }
}
