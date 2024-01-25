import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';

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
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        {
          provide: getRepositoryToken(Loan),
          useValue: mockRepositoryLoan,
        },
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('borrowBook() should return a borrowed book', async () => {

    const createLoanDto = {
      book: new Book(),
      user: new User(),
    };
    const result = await service.borrowBook(createLoanDto);
    expect(result).toMatchObject({ id: 1 });
  });
});
