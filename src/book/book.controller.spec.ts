import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { Types } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';

const books: Array<Book & { _id: Types.ObjectId }> = [
  {
    _id: new Types.ObjectId('65afa564e980bf6accd656f9'),
    title: 'Don Quijote de la Mancha',
    ISBN: '5432198502934',
    genre: 'Novela',
    description:
      'Esta edición del Ingenioso hidalgo don Quijote de la Mancha ...',
    author: 'Miguel de Cervantes',
    publisher: 'Santillana',
    pages: 592,
    imageUrl: 'www.imagen.com/quijote.png',
    available: true,
  },
  {
    _id: new Types.ObjectId('65afa564e980bf6adcd656f9'),
    title: 'Book Title',
    ISBN: '5432198502934',
    genre: 'Fiction',
    description: 'Book description',
    author: 'John Doe',
    publisher: 'Publisher',
    pages: 200,
    imageUrl: 'www.imagen.com/quijote.png',
    available: true,
  },
];

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;
  const mockBookService = {
    findAll: jest
      .fn()
      .mockImplementation((limit: number) =>
        Promise.resolve(books.slice(0, limit)),
      ),
    create: jest.fn().mockImplementation((createBookDto: CreateBookDto) =>
      Promise.resolve({
        ...createBookDto,
        _id: new Types.ObjectId('66afa564e980bf6adcd656f9'),
      }),
    ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        // {
        //   provide: BookService,
        //   useValue: mockBookService,
        // },
      ],
    })
      .overrideProvider(BookService)
      .useValue(mockBookService)
      .compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('GET findAll', () => {
    it('should call BookService.findAll with the provided limit', async () => {
      const limit = 10;
      const findAllSpy = jest.spyOn(service, 'findAll');
      await controller.findAll(limit);
      // expect(mockBookService.findAll).toHaveBeenCalledWith(limit);
      expect(findAllSpy).toHaveBeenCalledWith(limit);
    });
    it('should return a limited number of books', async () => {
      const limit = 1;
      const result = await controller.findAll(limit);
      expect(result).toMatchObject([books[0]]);
      //optional
      expect(result).not.toMatchObject([books[1]]);
    });
  });
  describe('POST createBook', () => {
    const newBook: CreateBookDto = {
      title: 'New Book',
      genre: 'Fiction',
      ISBN: '298543320458',
      description: 'New book description',
      author: 'Jane Doe',
      publisher: 'Publisher',
      pages: 300,
      imageUrl: 'www.example.com/new-book.png',
    };
    it('should call bookService.create with the provided newBook', async () => {
      const createBookSpy = jest.spyOn(service, 'create');
      await controller.create(newBook);
      expect(createBookSpy).toHaveBeenCalledWith(newBook);
    });
    it('should return a Book with _id', async () => {
      const expectedResult = {
        ...newBook,
        _id: new Types.ObjectId('66afa564e980bf6adcd656f9'),
      };
      const result = await controller.create(newBook);
      //option 1
      expect(result).toMatchObject(expectedResult);
      //option 2
      expect(result).toMatchObject({ _id: expect.any(Types.ObjectId) });
    });
  });
});
