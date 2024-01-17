import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
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

  @Put(':bookId')
  updateBook(@Param('bookId') bookId: string, @Body() book: any) {
    return this.bookService.updateBook(bookId, book);
  }
  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string) {
    return this.bookService.deleteBook(bookId);
  }
}
