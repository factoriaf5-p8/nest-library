import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { BookDto } from './book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
  findAll(limit: string): Promise<Book[]> {
    let options: {};
    if (limit) options = { take: +limit };
    return this.bookRepository.find(options);
    //return `findAll funciona límite de ${limit} registros`;
  }
  findBook(bookId: string): Promise<Book> {
    return this.bookRepository.findOneBy({ id: +bookId });
    //return `findBook funciona con el bookId = ${bookId}`;
    //select * from book where id = bookId
  }
  createBook(book: BookDto) {
    // console.log(book);
    //insert into table Book values();
    // return book;
    return this.bookRepository.save(book);
  }
  updateBook(bookId: string, book: BookDto) {
    // console.log('update', book);

    // return `updateBook funciona con el bookId = ${bookId}`;
    //select * from book where id = bookId
    return this.bookRepository.update({ id: +bookId }, book);
  }
  deleteBook(bookId: string) {
    // return `deleteBook funciona con el bookId = ${bookId}`;
    return this.bookRepository.delete({ id: +bookId });
    //select * from book where id = bookId
  }
}
