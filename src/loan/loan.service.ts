import { HttpException, Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { Book } from '../book/book.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}
  async borrowBook(createLoanDto: CreateLoanDto) {
    //TO-DO: lógica de decisión si el libro está disponible
    //update available: false

    // const availableBook = await this.bookRepository.findOne({
    //   where: { id: createLoanDto.book.id, available: true },
    // });
    // console.log(availableBook);

    // if (availableBook) {
    //   return this.loanRepository.save(createLoanDto);
    // } else {
    //   throw new HttpException(`book not available`, 404);
    // }
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const availableBook = await queryRunner.manager.findOne(Book, {
        where: { id: createLoanDto.book.id, available: true },
      });

      if (!availableBook) {
        throw new HttpException(`book not available`, 404);
      }

      const loan = await queryRunner.manager.save(Loan, createLoanDto);

      availableBook.available = false;
      await queryRunner.manager.save(Book, availableBook);

      await queryRunner.commitTransaction();

      return loan;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async findAll(): Promise<Loan[]> {
    return this.loanRepository.find({ relations: ['book', 'user'] });
  }
}
