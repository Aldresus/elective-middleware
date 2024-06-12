import { ApiProperty } from '@nestjs/swagger';
import { Notifications } from './notification.entity';
import { Role } from './role.entity.ts';

export class UserEntity {
  @ApiProperty()
  id: string;

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

  created_at: Date;
  edited_at: Date;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  password: string;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  id_users: Array<string>;

  @ApiProperty()
  notifications: Array<Notifications>;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
