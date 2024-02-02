import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dtos';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Book } from './book.entity';
// import { UpdateBookDto } from './dtos/update-book.dto';

@ApiTags('book')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de libros' })
  @ApiResponse({
    status: 201,
    description: 'Lista de libros',
    type: Array<Book>,
  })
  findAll(@Query('limit') limit: string) {
    return this.bookService.findAll(limit);
  }

  @Get(':bookId')
  @ApiOperation({ summary: 'Obtener un libro' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Devuelve un libro',
    type: Book,
  })
  @ApiResponse({ type: NotFoundException, status: HttpStatus.NOT_FOUND })
  findBook(@Param('bookId') bookId: string) {
    return this.bookService.findBook(bookId);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Crea un libro',
    description: 'Requires Admin role',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Devuelve un libro',
    type: Book,
  })
  @ApiResponse({ type: NotFoundException, status: HttpStatus.NOT_FOUND })
  createBook(@Body() newBook: CreateBookDto) {
    return this.bookService.createBook(newBook);
  }

  @Put(':bookId')
  updateBook(@Param('bookId') bookId: string, @Body() book: UpdateBookDto) {
    return this.bookService.updateBook(bookId, book);
  }
  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string) {
    return this.bookService.deleteBook(bookId);
  }
}
