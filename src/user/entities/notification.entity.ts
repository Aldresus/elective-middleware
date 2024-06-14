import { ApiProperty } from '@nestjs/swagger';

export class Notification {
  @ApiProperty()
  content: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  sent_date: Date;

  constructor(partial: Partial<Notification>) {
    Object.assign(this, partial);
  }
}
