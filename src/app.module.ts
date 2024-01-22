import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
<<<<<<< HEAD
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/library'), BookModule],
=======
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/library'),
    BookModule,
    UserModule,
  ],
>>>>>>> main
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
