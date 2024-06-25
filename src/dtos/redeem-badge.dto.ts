import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RedeemBadgeDto {
  @ApiProperty()
  @IsString()
  slug: string;
}
