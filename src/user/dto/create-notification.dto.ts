import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotificationDto {
    @ApiProperty()
    content: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    sent_date: Date;

}
