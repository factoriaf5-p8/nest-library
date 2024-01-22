import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
<<<<<<< HEAD
=======
import { BookService } from './book.service';
>>>>>>> main

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
<<<<<<< HEAD
=======
      providers: [BookService],
>>>>>>> main
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
