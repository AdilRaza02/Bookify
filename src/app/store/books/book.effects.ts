import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BookService } from '../../book/book.service';
import * as BookActions from './book.actions';

@Injectable()
export class BookEffects {
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() =>
        this.bookService.getBooks().pipe(
          map((response) => {
            if ('error' in response) {
              return BookActions.loadBooksFailure({
                error: 'Error Loading Books',
              });
            } else {
              return BookActions.loadBooksSuccess({ books: response });
            }
          }),
          catchError((error) => of(BookActions.loadBooksFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private bookService: BookService) {}
}
