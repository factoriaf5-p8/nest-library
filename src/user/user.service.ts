import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Book } from '../book/schemas/book.schema';
import { Loan } from './schemas/loan.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
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
    const transactionSession = await this.connection.startSession();
    try {
      transactionSession.startTransaction();
      //busco el usuario
      const user: UserDocument = await this.userModel.findById(userId);
      console.log(user);
      // busco el libro y actualizo el flag available
      const book: Book = await this.bookModel.findByIdAndUpdate(bookId, {
        available: false,
      });
      // si el libro está disponible lo presto. Actualizar el array de loans con un nuevo préstamo.
      if (book.available) {
        const loan: Loan = new Loan();
        loan.ISBN = book.ISBN;
        loan.book = book;

        user.loans.push(loan);
        const result = await user.save();
        transactionSession.commitTransaction();
        return result;
      } else {
        throw new Error('libro no disponible');
      }
    } catch (error) {
      transactionSession.abortTransaction();
      return { message: error.message };
    } finally {
      transactionSession.endSession();
    }
    // return user;
  }
}
