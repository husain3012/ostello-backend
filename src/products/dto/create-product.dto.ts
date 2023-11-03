import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Product should have a name' })
  @Length(2, 255, {
    message: 'Product name should be 2 to 255 characters long',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Product should have a description' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Product should have a price' })
  @Min(0)
  price: number;

  @ApiProperty()
  imageURL: string;
}
