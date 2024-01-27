import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Book } from '../book/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan]), TypeOrmModule.forFeature([Book])],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
