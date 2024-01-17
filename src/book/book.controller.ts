import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(@Query('limit') limit: string) {
    return this.bookService.findAll(limit);
  }

  @Get(':bookId')
  findBook(@Param('bookId') bookId: string) {
    return this.bookService.findBook(bookId);
  }

  @Post()
  createBook(@Body() newBook: any) {
    return this.bookService.createBook(newBook);
  }
}
