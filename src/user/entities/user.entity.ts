import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  email: string;

  created_at: Date;
  edited_at: Date;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  id_users: Array<string>;

  @ApiProperty()
  notifications: Array<Notification>;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
