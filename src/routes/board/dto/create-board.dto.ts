import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '작성자 id',
    required: true,
    example: 1,
  })
  userId: number;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  @ApiProperty({
    description: '제목',
    required: true,
    example: '안녕하세요',
  })
  title: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @ApiProperty({
    description: '내용',
    required: true,
    example: '안녕하세요 반갑습니다.',
  })
  contents: string;
}
