import { HttpException, Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { Book } from '../book/book.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
  async borrowBook(createLoanDto: CreateLoanDto) {
    //TO-DO: lógica de decisión si el libro está disponible
    //update available: false

    const availableBook = await this.bookRepository.findOne({
      where: { id: createLoanDto.book.id, available: true },
    });
    // console.log(availableBook);

    if (availableBook) {
      return this.loanRepository.save(createLoanDto);
    } else {
      throw new HttpException(`book not available`, 404);
    }
  }
  async findAll(): Promise<Loan[]> {
    return this.loanRepository.find({ relations: ['book', 'user'] });
  }
}
