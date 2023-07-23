import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './book.model';

const getBooksFeatureState = createFeatureSelector<BooksState>('books');

export const getBooks = createSelector(
  getBooksFeatureState,
  (state) => state.books
);
export const getBooksLoading = createSelector(
  getBooksFeatureState,
  (state) => state.loading
);
export const getBooksError = createSelector(
  getBooksFeatureState,
  (state) => state.error
);
