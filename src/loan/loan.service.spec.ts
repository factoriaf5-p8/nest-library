import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';
import { HttpException } from '@nestjs/common';

describe('LoanService', () => {
  let service: LoanService;
  const mockRepositoryLoan: Partial<Repository<Loan>> = {
    save: jest.fn().mockImplementation((createLoanDto: CreateLoanDto) => {
      return Promise.resolve({
        ...createLoanDto,
        id: 1,
        loanDate: Date.now(),
        returnDate: Date.now(),
      });
    }),
  };
  const mockRepositoryBook: Partial<Repository<Book>> = {
    findOne: jest
      .fn()
      .mockImplementation(
        (condition: { where: { id: number; available: boolean } }) => {
          if (condition.where.id == 2) {
            return Promise.resolve(false);
          } else {
            return Promise.resolve(new Book());
          }
        },
      ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        {
          provide: getRepositoryToken(Loan),
          useValue: mockRepositoryLoan,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: mockRepositoryBook,
        },
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('borrowBook() should return a borrowed book', async () => {
    const book = new Book();
    book.id = 1;
    const createLoanDto = {
      book,
      user: new User(),
    };
    const result = await service.borrowBook(createLoanDto);
    expect(result).toMatchObject({ id: 1 });
  });
  it('borrowBook() should throw an http exception object with message: "book not available"', async () => {
    const book = new Book();
    book.id = 2;
    const createLoanDto = {
      book,
      user: new User(),
    };
    // const result = await service.borrowBook(createLoanDto);
    expect(async () => await service.borrowBook(createLoanDto)).rejects.toThrow(
      new HttpException('book not available', 404),
    );
  });
});
