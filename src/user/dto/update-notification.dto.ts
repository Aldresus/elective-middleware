import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

export class UpdateUserDto extends PartialType(CreateNotificationDto) {
  @ApiProperty()
  content: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  sent_date: Date;
}