import { Loan } from '../loan/entities/loan.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  email: string;
  @Column({ unique: true })
  password: string;
  @Column({ nullable: true })
  photo: string;
  @Column({ default: 'user' })
  role: string;
  @OneToMany(() => Loan, (loans: Loan) => loans.user)
  loans: Loan[];
}
