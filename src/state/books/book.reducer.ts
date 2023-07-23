import { createReducer, on } from '@ngrx/store';
import * as BookActions from './book.actions';
import { BooksState } from './book.model';

export const initialState: BooksState = {
  books: [],
  loading: false,
  error: '',
};

export const bookReducer = createReducer(
  initialState,

  on(BookActions.loadBooks, (state) => ({ ...state, loading: true })),

  on(BookActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    loading: false,
  })),

  on(BookActions.loadBooksFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(BookActions.addBook, (state, { book }) => ({
    ...state,
    books: [...state.books, book],
  })),

  on(BookActions.updateBook, (state, { book }) => ({
    ...state,
    books: state.books.map((b) => (b.title === book.title ? book : b)),
  })),

  on(BookActions.deleteBook, (state, { title }) => ({
    ...state,
    books: state.books.filter((b) => b.title !== title),
  }))
);
