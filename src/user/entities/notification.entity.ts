import { ApiProperty } from '@nestjs/swagger';

export class Notifications {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  sent_date: Date;

  constructor(partial: Partial<Notifications>) {
    Object.assign(this, partial);
  }
}
