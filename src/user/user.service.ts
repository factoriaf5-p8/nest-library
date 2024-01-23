import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Book } from '../book/book.schema';
import { Loan } from './schemas/loan.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Book.name) private bookModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
    // return 'This action adds a new user';
  }

  findAll() {
    return this.userModel.find().exec();
    // return `This action returns all user`;
  }

  findOneById(id: string) {
    return this.userModel.findById(id);
    // return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: string): Promise<any> {
    return this.userModel.deleteOne({ _id: id });
  }

  async borrowBook(bookId: string, userId: string) {
    const user: UserDocument = await this.userModel.findById(userId);
    console.log(user);

    const book: Book = await this.bookModel.findById(bookId);
    if (book.available) {
      const loan: Loan = new Loan();
      loan.ISBN = book.ISBN;
      loan.book = book;

      user.loans.push(loan);
      return user.save();
    }
    // return user;
  }
}
