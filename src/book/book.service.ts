import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  findAll() {
    return 'findAll funciona';
  }
  findBook(bookId: string) {
    return `findBook funciona con el bookId = ${bookId}`;
    //select * from book where id = bookId
  }
}
