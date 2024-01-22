import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
  findAll(limit: string) {
    return this.bookRepository.find({ take: +limit });
    //return `findAll funciona límite de ${limit} registros`;
  }
  findBook(bookId: string) {
    return `findBook funciona con el bookId = ${bookId}`;
    //select * from book where id = bookId
  }
  createBook(book: any) {
    console.log(book);
    //insert into table Book values();
    return book;
  }
  updateBook(bookId: string, book: any) {
    console.log('update', book);

    return `updateBook funciona con el bookId = ${bookId}`;
    //select * from book where id = bookId
  }
  deleteBook(bookId: string) {
    return `deleteBook funciona con el bookId = ${bookId}`;
    //select * from book where id = bookId
  }
}
