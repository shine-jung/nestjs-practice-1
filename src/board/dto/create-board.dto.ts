import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({
    description: '제목',
    required: true,
    example: '안녕하세요',
    default: '빈 제목',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '내용',
    required: true,
    example: '안녕하세요 반갑습니다.',
    default: '빈 내용',
  })
  content: string;
}
