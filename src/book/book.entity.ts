import { Loan } from '../loan/entities/loan.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number; // int NOT NULL AUTO_INCREMENT,

  @Column()
  title: string; // varchar(255) NOT NULL,

  @Column()
  genre: string; // varchar(255) NOT NULL,

  @Column()
  description: string; // varchar(255) NOT NULL,

  @Column()
  author: string; // varchar(255) NOT NULL,

  @Column()
  publisher: string; // varchar(255) NOT NULL,

  @Column()
  pages: string; // int NOT NULL,

  @Column()
  image_url: string; // varchar(255) NOT NULL,

  @Column({ default: true })
  available: boolean; // tinyint NOT NULL,

  @OneToMany(() => Loan, (loans: Loan) => loans.book)
  loans: Loan[];
}
