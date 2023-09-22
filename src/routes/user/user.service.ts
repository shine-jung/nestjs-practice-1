import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    const { username, name, password } = data;

    const encryptedPassword = await this.encryptPassword(password);

    // create를 하면 entity의 속성만 복사해준다.
    const newUser = this.userRepository.create({
      username,
      name,
      password: encryptedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async getUsers() {
    // return this.userRepository.find({ relations: ['boards'] });

    // return this.userRepository.find({
    //   relations: { boards: true },
    //   select: { boards: { id: true } }, // boards의 id만 가져옴
    // });

    const qb = this.userRepository.createQueryBuilder(); // User로 안 할 때 다른 이름을 넣는다.

    // 대소문자 구분
    // sub query 사용
    qb.addSelect((subQuery) => {
      return subQuery
        .select('COUNT(id)')
        .from(Board, 'Board') // mapping을 위해 alias 작성
        .where('Board.user_id = User.id');
    }, 'User_boardCount');

    return qb.getMany();
  }

  async encryptPassword(password: string) {
    // salt의 적정값은 10~12. 너무 낮으면 보안에 취약하고 너무 높으면 성능에 문제가 생긴다.
    const DEFAULT_SALT = 12;
    return hash(password, DEFAULT_SALT);
  }
}
