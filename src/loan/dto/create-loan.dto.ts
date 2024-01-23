import { Book } from '../../book/book.entity';
import { User } from '../../user/user.entity';

export class CreateLoanDto {
  readonly book: Book;
  readonly user: User;
}
