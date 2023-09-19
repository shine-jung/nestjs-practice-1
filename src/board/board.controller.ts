import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    console.log(typeof id);
    return this.boardService.find(+id);
  }

  @Post()
  create(@Body() data) {
    return this.boardService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data) {
    return this.boardService.update(+id, data);
  }

  // Decorator가 있어야 mapping이 됨.
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.boardService.remove(+id);
  }
}
