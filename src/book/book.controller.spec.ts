import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos';
import { NotFoundException } from '@nestjs/common';

const books: Book[] = [
  {
    id: 99,
    title: 'Don Quijote de la Mancha',
    genre: 'Novela',
    description:
      'Esta edición del Ingenioso hidalgo don Quijote de la Mancha ...',
    author: 'Miguel de Cervantes',
    publisher: 'Santillana',
    pages: 592,
    image_url: 'www.imagen.com/quijote.png',
    available: true,
    loans: [],
  },
  {
    id: 100,
    title: 'Book Title',
    genre: 'Fiction',
    description: 'Book description',
    author: 'John Doe',
    publisher: 'Publisher',
    pages: 200,
    image_url: 'www.example.com/book.png',
    available: true,
    loans: [],
  },
];

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;
  const mockBookService = {
    findAll: (limit: string) => Promise.resolve(books.slice(0, +limit)),
    findBook: jest
      .fn()
      .mockImplementation((id: string) =>
        Promise.resolve(books.find((book: Book) => book.id === +id)),
      ),
    createBook: jest
      .fn()
      .mockImplementation((createBookDto: CreateBookDto) =>
        Promise.resolve({ ...createBookDto, id: 101 }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
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

  describe('findAll', () => {
    it('should call bookService.findAll with the provided limit', async () => {
      const limit = '10';
      const findAllSpy = jest.spyOn(service, 'findAll');
      await controller.findAll(limit);
      expect(findAllSpy).toHaveBeenCalledWith(limit);
    });

    it('should return a limited number of books', async () => {
      const limit = '1';
      const expectedResult = books.slice(0, 1);
      const result = await controller.findAll(limit);

      expect(result).toMatchObject(expectedResult);
    });
  });
  describe('findBook', () => {
    it('should call bookService.findBook with the provided bookId', async () => {
      const bookId = '100';
      const findBookSpy = jest.spyOn(service, 'findBook');
      await controller.findBook(bookId);
      expect(findBookSpy).toHaveBeenCalledWith(bookId);
    });

    it('should return the result of bookService.findBook', async () => {
      const bookId = '100';

      const result = await controller.findBook(bookId);
      expect(result).toMatchObject({ id: 100 });
    });

    it('should throw a not-found-exception when the book is not found', async () => {
      const bookId = '102';
      service.findBook = jest
        .fn()
        .mockRejectedValue(new NotFoundException('Book not found'));
      try {
        await controller.findBook(bookId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Book not found');
      }
    });
  });

  describe('createBook', () => {
    const newBook: CreateBookDto = {
      title: 'New Book',
      genre: 'Fiction',
      description: 'New book description',
      author: 'Jane Doe',
      publisher: 'Publisher',
      pages: 300,
      image_url: 'www.example.com/new-book.png',
    };
    it('should call bookService.createBook with the provided newBook', async () => {
      const createBookSpy = jest.spyOn(service, 'createBook');
      await controller.createBook(newBook);
      expect(createBookSpy).toHaveBeenCalledWith(newBook);
    });

    it('should return the result of bookService.createBook', async () => {
      const expectedResult = { id: 101, ...newBook };
      // jest.spyOn(service, 'createBook').mockResolvedValue(expectedResult);
      expect(await controller.createBook(newBook)).toMatchObject(
        expectedResult,
      );
    });
  });
});
