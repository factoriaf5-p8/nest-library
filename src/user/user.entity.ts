import { Loan } from '../loan/entities/loan.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { hash, genSalt } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({ unique: true }) username: string;

  @Column() email: string;

  @Column() password: string;

  @Column({ nullable: true }) photo: string;

  @Column({ default: 'user' }) role: string;

  @BeforeInsert()
  async hashPassword() {
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(this.password, salt);
      this.password = hashedPassword;
      console.log(this.password);
    } catch (error) {
      throw new Error('encripting password failed');
    }
  }

  @OneToMany(() => Loan, (loans: Loan) => loans.user) loans: Loan[];
}
