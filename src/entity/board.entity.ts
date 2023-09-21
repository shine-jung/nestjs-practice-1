import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'board' })
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'user_id',
    required: true,
    example: 1,
  })
  @Column({ name: 'user_id' })
  userId: number;

  @ApiProperty({
    description: '제목',
    required: true,
    example: '안녕하세요',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: '내용',
    required: true,
    example: '안녕하세요 반갑습니다.',
  })
  @Column()
  contents: string;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정일' })
  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;

  @ApiProperty({ description: '작성자' })
  // N:1 관계 설정
  // () => User: User라는 entity를 사용한다는 의미
  // Arrow function을 사용하면 User entity가 정의되기 전에
  // Board entity가 정의되어도 문제가 없음.
  // 순환 참조 방지
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
