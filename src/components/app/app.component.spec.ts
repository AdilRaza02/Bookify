import { AppComponent } from './app.component';
import { HeaderComponent } from '../header/header.component';
import { BookComponent } from '../book/book.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RenderResult, render } from '@testing-library/angular';

describe('AppComponent', () => {
  let component: RenderResult<AppComponent>;
  const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  beforeEach(async () => {
    component = await render(AppComponent, {
      imports: [HeaderComponent, BookComponent],
      providers: [provideMockStore({ initialState })],
    });
  });

  it('should create', () => {
    expect(component.fixture.componentInstance).toBeTruthy();
  });

  it('should render the HeaderComponent', () => {
    const headerComponent =
      component.fixture.nativeElement.querySelector('app-header');
    expect(headerComponent).toBeTruthy();
  });

  it('should render the BookComponent', () => {
    const bookComponent =
      component.fixture.nativeElement.querySelector('app-book');
    expect(bookComponent).toBeTruthy();
  });
});
