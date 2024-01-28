import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;
@Schema()
export class Book {
  @Prop({ unique: true, required: true })
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
  imageUrl: string;
  @Prop({ default: true })
  available: boolean;
  @Prop()
  pages: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
