import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @ApiProperty()
  content: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  read: boolean;

  @ApiProperty()
  sent_date: Date;
}
