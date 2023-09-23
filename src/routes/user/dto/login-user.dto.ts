import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '아이디',
    required: true,
    example: 'admin',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '비밀번호',
    required: true,
    example: '1234',
  })
  password: string;
}
