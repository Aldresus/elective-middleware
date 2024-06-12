import { ApiProperty } from '@nestjs/swagger';

export class Role {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  sent_date: Date;

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}
