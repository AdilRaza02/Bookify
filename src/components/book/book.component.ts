import {
  getBooksLoading,
  getBooks,
  getBooksError,
} from '../../state/books/book.selectors';
import { Book } from '../../state/books/book.model';
import { HttpClientModule } from '@angular/common/http';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBooks } from '../../state/books/book.actions';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  standalone: true,
  imports: [
    AlertComponent,
    FormsModule,
    BookModalComponent,
    CommonModule,
    HttpClientModule,
  ],
})
export class BookComponent implements OnInit {
  @ViewChild('bookModalRef', { static: false })
  bookModalComponent!: BookModalComponent;

  public books$: Observable<Book[]> = new Observable<Book[]>();
  public loading$: Observable<boolean> = new Observable<boolean>();
  public error$: Observable<string> = new Observable<string>();

  public searchInput: string = '';
  public selectedBook: Book | null = null;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadBooks());
    this.books$ = this.store.select(getBooks);
    this.loading$ = this.store.select(getBooksLoading);
    this.error$ = this.store.select(getBooksError);
  }

  getFilteredBooks(): Observable<Book[]> {
    return this.books$.pipe(
      map((books) =>
        books.filter((book) =>
          book.title.toLowerCase().includes(this.searchInput.toLowerCase())
        )
      )
    );
  }

  openBookModal(book?: Book) {
    if (this.bookModalComponent) {
      this.bookModalComponent.openBookModal(book);
    }
  }
}
