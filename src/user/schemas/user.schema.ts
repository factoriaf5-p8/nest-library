import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Loan, LoanSchema } from './loan.schema';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  photo: string;
  @Prop({ default: 'user' })
  role: string;
  @Prop([LoanSchema])
  loans: Loan[];
}
export const UserSchema = SchemaFactory.createForClass(User);
