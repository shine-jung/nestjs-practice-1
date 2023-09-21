import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateBoardDto {
  @IsOptional()
  @MinLength(1)
  @MaxLength(20)
  @ApiProperty({
    description: '제목',
    required: false,
    example: '안녕하세요',
  })
  title: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  @ApiProperty({
    description: '내용',
    required: false,
    example: '안녕하세요 반갑습니다.',
  })
  contents: string;
}

// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
// export class UpdateBoardDto extends PickType(CreateBoardDto, ['title']) {}
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ['title']) {}
