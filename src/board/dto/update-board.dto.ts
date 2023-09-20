import { MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateBoardDto {
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;
}

// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
// export class UpdateBoardDto extends PickType(CreateBoardDto, ['title']) {}
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ['title']) {}
