import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, timer } from 'rxjs';
import { Book } from '../../state/books/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly booksUrl = 'assets/data/books.json';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    const delay = 1000; // Simulating API
    
    return timer(delay).pipe(
      switchMap(() => {
        return this.http.get<Book[]>(this.booksUrl);
      }),
      catchError((error) => {
        console.error(error);
        return of(error);
      })
    );
  }
}
