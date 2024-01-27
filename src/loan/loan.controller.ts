import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport';
// import { UpdateLoanDto } from './dto/update-loan.dto';

@UseGuards(AuthGuard('jwt'))
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
