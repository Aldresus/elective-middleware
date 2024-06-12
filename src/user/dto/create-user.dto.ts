import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../entities/role.entity.ts';

export class CreateUserDto {
  @ApiProperty()
  last_name: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  password: string;

  @ApiProperty({ default: '000000000000000000000000' })
  id_restaurant: string;

  @ApiPropertyOptional({ default: [] })
  id_users?: Array<string>;
}
