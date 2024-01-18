import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  genre: string;
  @Column()
  description: string;
  @Column()
  author: string;
  @Column()
  publisher: string;
  @Column()
  pages: number;
  @Column()
  image_url: string;
  @Column()
  available: boolean;
}
