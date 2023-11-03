import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty()
  @IsString()
  @Length(3)
  cartId: string;

  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
