import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  private boards = [
    {
      id: 1,
      title: 'hello world 1',
      content: 'Content 1',
    },
    {
      id: 2,
      title: 'hello world 2',
      content: 'Content 2',
    },
  ];

  findAll() {
    return this.boards;
  }

  find(id: number) {
    const index = this.getBoardIndex(id);
    return this.boards[index];
  }

  create(data: CreateBoardDto) {
    const newBoard = { id: this.getNextId(), ...data };
    this.boards.push(newBoard);
    return newBoard;
  }

  update(id: number, data: UpdateBoardDto) {
    const index = this.getBoardIndex(id);

    if (index > -1) {
      this.boards[index] = {
        ...this.boards[index],
        ...data, // 덮어씀
      };
      return this.boards[index];
    }

    return null;
  }

  remove(id: number) {
    const index = this.getBoardIndex(id);

    if (index > -1) {
      const deleteBoard = this.boards[index];
      this.boards.splice(index, 1);
      return deleteBoard; // 알림
    }

    return null;
  }

  getBoardIndex(id: number) {
    return this.boards.findIndex((board) => board.id === id);
  }

  getNextId() {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }
}
