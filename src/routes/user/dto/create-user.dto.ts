import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({
    description: '아이디',
    required: true,
    example: 'admin',
  })
  username: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description: '비밀번호',
    required: true,
    example: '1234',
  })
  password: string;

  // repassword: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({
    description: '이름',
    required: true,
    example: '홍길동',
  })
  name: string;

  // @IsNotEmpty()
  // @IsEmail()
  // @ApiProperty({
  //   description: '이메일',
  //   required: true,
  //   example: 'example@gmail.com',
  // })
  // email: string;

  // @IsNotEmpty()
  // @IsPhoneNumber('KR')
  // @ApiProperty({
  //   description: '전화번호',
  //   required: true,
  //   example: '01012345678',
  // })
  // phone: string;

  // @IsIn(['Female', 'Male'])
  // @ApiProperty({
  //   description: '성별',
  //   required: true,
  //   example: 'Male',
  // })
  // gender: string;
}
