import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false })
  last_name?: string;

  @ApiProperty({ required: false })
  first_name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  postal_code?: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty({ required: false })
  birthday?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  role?: string;

  @ApiProperty({ required: false })
  password?: string;

  @ApiProperty({ default: '111111111111111111111111', required: false })
  id_restaurant?: string;

  @ApiProperty({ required: false })
  id_users?: string[];
}
