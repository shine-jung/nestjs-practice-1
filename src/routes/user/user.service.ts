import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

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

  async login(data: LoginUserDto) {
    const { username, password } = data;

    const user = await this.userRepository.findOneBy({ username });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      throw new HttpException('Password is invalid', HttpStatus.UNAUTHORIZED);

    // payload - 토큰에 담을 데이터
    const payload = {
      username,
      sub: user.id, // subject
      name: user.name,
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1d' },
    );

    return {
      accessToken,
    };
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
