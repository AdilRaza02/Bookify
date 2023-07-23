import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Book } from '../../state/books/book.model';
import { loadBooks } from '../../state/books/book.actions';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { RenderResult, render } from '@testing-library/angular';

describe('BookComponent', () => {
  let component: RenderResult<BookComponent>;
  let fixture: ComponentFixture<BookComponent>;
  let store: MockStore;
  const initialState = {
    books: {
      books: [],
      loading: false,
      error: null,
    },
  };

  beforeEach(waitForAsync(async () => {
    component = await render(BookComponent, {
      imports: [BookModalComponent],
      providers: [provideMockStore({ initialState })],
    });

    fixture = component.fixture;
    store = TestBed.inject(Store) as MockStore;
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadBooks action on ngOnInit', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.componentInstance.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadBooks());
  });

  it('should display loading message while loading books', () => {
    store.setState({ books: { ...initialState.books, loading: true } });
    fixture.detectChanges();
    const loadingElement = fixture.nativeElement.querySelector('#loadingAlert');
    expect(loadingElement.textContent).toContain('Loading Books...');
  });

  it('should display error message when books loading fails', () => {
    const errorMessage = 'Failed to load books';
    store.setState({ books: { ...initialState.books, error: errorMessage } });
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('#errorAlert');
    expect(errorElement.textContent).toContain(errorMessage);
  });

  it('should filter books based on search input', () => {
    const books: Book[] = [
      {
        title: 'Book 1',
        author: 'Author 1',
        publication_date: '2023-07-23',
        genre: 'Fiction',
        publisher: 'Publisher 1',
      },
      {
        title: 'Book 2',
        author: 'Author 2',
        publication_date: '2023-07-24',
        genre: 'Non-fiction',
        publisher: 'Publisher 2',
      },
    ];
    store.setState({ books: { ...initialState.books, books } });
    fixture.detectChanges();

    fixture.componentInstance.searchInput = 'book 2';
    fixture.detectChanges();

    const filteredBooks = fixture.componentInstance.getFilteredBooks();
    filteredBooks.subscribe((filtered) => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].title).toBe('Book 2');
    });
  });
});
