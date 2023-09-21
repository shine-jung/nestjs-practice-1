import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    // return this.boardRepository.find();
    // return this.boardRepository.find({ relations: { user: true } });
    return this.boardRepository.find({ relations: ['user'] });
  }

  async find(id: number) {
    // findOne - Finds first entity that matches given where condition.
    // findOneBy - Finds first entity that matches given id.
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    // const board = await this.getBoardById(id);

    if (!board) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return board;
  }

  async create(data: CreateBoardDto) {
    // 인스턴스 생성
    const newBoard = this.boardRepository.create(data);
    // 저장
    return this.boardRepository.save(newBoard);
  }

  async update(id: number, data: UpdateBoardDto) {
    // return await this.boardRepository.update(id, data);
    const board = await this.getBoardById(id);

    if (!board) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return this.boardRepository.update(id, data);
  }

  async remove(id: number) {
    const board = await this.getBoardById(id);

    if (!board) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    // remove와 delete의 차이점은 remove는 entity를 받아서 삭제하고 delete는 id를 받아서 삭제한다.
    // return this.boardRepository.delete(id); // return Promise<DeleteResult>
    return this.boardRepository.remove(board); // return Promise<Entity>
  }

  async getBoardById(id: number) {
    return this.boardRepository.findOneBy({ id });
  }
}
