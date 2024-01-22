import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto, UpdateBookDto } from './dtos';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
  async findAll(limit: string): Promise<Book[]> {
    let options: FindManyOptions<Book>;
    if (limit) options = { take: +limit };
    return this.bookRepository.find(options);
    //return `findAll funciona límite de ${limit} registros`;
  }
  async findBook(bookId: string): Promise<Book> {
    return this.bookRepository.findOneBy({ id: +bookId });
    //return `findBook funciona con el bookId = ${bookId}`;
    //select * from book where id = bookId
  }
  async createBook(book: CreateBookDto): Promise<Book> {
    // console.log(book);
    //insert into table Book values();
    // return book;
    return this.bookRepository.save(book);
  }
  async updateBook(bookId: string, book: UpdateBookDto) {
    // console.log('update', book);

    // return `updateBook funciona con el bookId = ${bookId}`;
    //select * from book where id = bookId
    const result = await this.bookRepository.update({ id: +bookId }, book);
    if (result) return { message: 'updated OK' };
  }
  async deleteBook(bookId: string) {
    // return `deleteBook funciona con el bookId = ${bookId}`;
    const result = await this.bookRepository.delete({ id: +bookId });
    if (result) return { message: 'deleted OK' };
    //select * from book where id = bookId
  }
}
