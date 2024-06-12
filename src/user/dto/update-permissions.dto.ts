import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdatePermissionsDto {
  @ApiProperty()
  permissions: string[];
}
