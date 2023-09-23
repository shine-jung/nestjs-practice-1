import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class User {
  // 순차적으로 증가하는 유니크한 값을 생성해줌.
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '유저아이디',
    required: true,
    example: 'admin',
  })
  // unique: true를 해주면 username이 중복되지 않음.
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: '비밀번호',
    required: true,
    example: '1234',
  })
  // select: false를 해주면 DB에서는 password를 가져오지 않음.
  // @Column({ select: false })
  @Column()
  password: string;

  @ApiProperty({
    description: '이름',
    required: true,
    example: '홍길동',
  })
  @Column()
  name: string;

  @ApiProperty({ description: '생성일' })
  // 컬럼명을 따로 지정해주고 싶을 때
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정일' })
  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;

  @ApiProperty({ description: '작성글' })
  // 1:N 관계 설정
  // () => Board: Board라는 entity를 사용한다는 의미
  // Arrow function을 사용하면 Board entity가 정의되기 전에
  // User entity가 정의되어도 문제가 없음.
  // 순환 참조 방지
  // (board) => board.user: Board entity에서 user를 사용한다는 의미
  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  // Virtual Property
  // DB에 저장되지 않지만, Entity에서는 사용할 수 있는 속성
  @ApiProperty({ description: '작성글 수' })
  @Column({
    select: false,
    nullable: true,
    insert: false,
    update: false,
    default: 0,
  })
  boardCount?: number;
}
