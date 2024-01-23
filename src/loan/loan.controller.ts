import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
// import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('bookloan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  borrowBook(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.borrowBook(createLoanDto);
  }

  @Get()
  findAll() {
    return this.loanService.findAll();
  }
}
