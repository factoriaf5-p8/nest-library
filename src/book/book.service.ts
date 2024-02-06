import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  create(createBookDto: CreateBookDto) {
    return this.bookModel.create(createBookDto);
    // return 'This action adds a new book';
  }

  findAll(limit: number) {
    return this.bookModel.find().limit(limit).exec();
    // return `This action returns all book`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} book`;
  // }

  // update(id: number, updateBookDto: UpdateBookDto) {
  //   return `This action updates a #${id} book`;
  // }

  remove(id: string): Promise<any> {
    return this.bookModel.deleteOne({ _id: id });
    // return `This action removes a #${id} book`;
  }
}
