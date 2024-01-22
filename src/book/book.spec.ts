import { Book } from './book.schema';

describe('Book', () => {
  it('should be defined', () => {
    expect(new Book()).toBeDefined();
  });
});
