import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(limit: string): Promise<Book[]> {
    return this.bookModel.find().limit(+limit).exec();
    // return `findAll funciona límite de ${limit} registros`;
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
