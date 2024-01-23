import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
  ) {}
  async borrowBook(createLoanDto: CreateLoanDto) {
    return this.loanRepository.save(createLoanDto);
  }
  async findAll(): Promise<Loan[]> {
    return this.loanRepository.find({ relations: ['book', 'user'] });
  }
}
