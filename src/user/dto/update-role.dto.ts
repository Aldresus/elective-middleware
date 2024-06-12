import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty()
  name: string;
}
