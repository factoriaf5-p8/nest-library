import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  findAll(limit: string) {
    return `findAll funciona límite de ${limit} registros`;
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
