import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':bookId')
  findBook(@Param('bookId') bookId: string) {
    return this.bookService.findBook(bookId);
  }
}
