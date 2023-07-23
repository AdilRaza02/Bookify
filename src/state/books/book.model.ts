export interface Book {
  title: string;
  author: string;
  publication_date: string;
  genre: string;
  publisher: string;
}

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: string;
}
