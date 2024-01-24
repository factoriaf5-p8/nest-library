import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Book } from '../../book/schemas/book.schema';

export type LoanDocument = HydratedDocument<Loan>;
@Schema()
export class Loan {
  @Prop()
  ISBN: string;
  @Prop({ default: Date.now() })
  loanDate: string;
  @Prop({
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })
  returnDate: string;
  //select * from loan join book on loan._id = book._id
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;
}
export const LoanSchema = SchemaFactory.createForClass(Loan);
