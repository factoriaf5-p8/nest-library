import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    // return this.bookService.create(createBookDto);
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll(@Query('limit') limit: number) {
    return this.bookService.findAll(limit);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bookService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.bookService.update(+id, updateBookDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
