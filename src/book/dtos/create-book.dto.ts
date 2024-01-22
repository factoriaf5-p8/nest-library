export class CreateBookDto {
  title: string; // varchar(255) NOT NULL,
  genre: string; // varchar(255) NOT NULL,
  description: string; // varchar(255) NOT NULL,
  author: string; // varchar(255) NOT NULL,
  publisher: string; // varchar(255) NOT NULL,
  pages: string; // int NOT NULL,
  image_url: string; // varchar(255) NOT NULL,
}
