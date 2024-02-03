import { ApiProperty } from '@nestjs/swagger';
import { Loan } from '../loan/entities/loan.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Book {
  @ApiProperty({ example: 99 })
  @PrimaryGeneratedColumn('increment')
  id: number; // int NOT NULL AUTO_INCREMENT,
  @ApiProperty({ example: 'Don Quijote de la Mancha' })
  @Column({nullable:false})
  title: string; // varchar(255) NOT NULL,
  @ApiProperty({ example: 'Novela' })
  @Column()
  genre: string; // varchar(255) NOT NULL,
  @ApiProperty({
    example: 'Esta edición del Ingenioso hidalgo don Quijote de la Mancha ...',
  })
  @Column('text')
  description: string; // varchar(255) NOT NULL,
  @ApiProperty({ example: 'Miguel de Cervantes' })
  @Column()
  author: string; // varchar(255) NOT NULL,
  @ApiProperty({ example: 'Santillana' })
  @Column()
  publisher: string; // varchar(255) NOT NULL,
  @ApiProperty({ example: 592 })
  @Column()
  pages: number; // int NOT NULL,
  @ApiProperty({ example: 'www.imagen.com/quijote.png' })
  @Column()
  image_url: string; // varchar(255) NOT NULL,
  @ApiProperty({ example: true })
  @Column({ default: true })
  available: boolean; // tinyint NOT NULL,
  @ApiProperty({ type: Array<Loan> })
  @OneToMany(() => Loan, (loans: Loan) => loans.book)
  loans: Loan[];
}
