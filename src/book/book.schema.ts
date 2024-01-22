import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  ISBN: string;
  @Prop()
  title: string;
  @Prop()
  genre: string;
  @Prop()
  description: string;
  @Prop()
  author: string;
  @Prop()
  publisher: string;
  @Prop()
  pages: string;
  @Prop()
  imageUrl: string;
  @Prop()
  available: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
