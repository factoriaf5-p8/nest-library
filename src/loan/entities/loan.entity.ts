import { User } from '../../user/user.entity';
import { Book } from '../../book/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  // EntitySubscriberInterface,
  // EventSubscriber,
  // InsertEvent,
} from 'typeorm';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn('increment')
  id: number; // int NOT NULL AUTO_INCREMENT,
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  loanDate: Date;
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  returnDate: Date;
  @ManyToOne(() => Book, (book: Book) => book.loans)
  book: Book;
  @ManyToOne(() => User, (user: User) => user.loans)
  user: User;
}

// @EventSubscriber()
// export class LoanSubscriber implements EntitySubscriberInterface<Loan> {
//   listenTo() {
//     return Loan;
//   }

//   beforeInsert(event: InsertEvent<Loan>) {
//     const loan = event.entity;
//     loan.loanDate = new Date();
//     loan.returnDate = new Date();
//     loan.returnDate.setDate(loan.returnDate.getDate() + 30);
//   }
//}
