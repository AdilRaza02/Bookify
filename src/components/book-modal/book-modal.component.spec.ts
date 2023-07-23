import { ComponentFixture, waitForAsync } from '@angular/core/testing';
import { BookModalComponent } from './book-modal.component';
import { render, RenderResult, fireEvent } from '@testing-library/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  addBook,
  deleteBook,
  updateBook,
} from '../../state/books/book.actions';

describe('BookModalComponent', () => {
  let component: RenderResult<BookModalComponent>;
  let fixture: ComponentFixture<BookModalComponent>;
  let dispatchSpy: jest.SpyInstance;
  let formResetSpy: jest.SpyInstance;

  beforeEach(waitForAsync(async () => {
    component = await render(BookModalComponent, {
      imports: [FormsModule, ReactiveFormsModule, CommonModule],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
          },
        },
      ],
    });

    fixture = component.fixture;
    dispatchSpy = jest.spyOn(fixture.componentInstance['store'], 'dispatch');
    formResetSpy = jest.spyOn(fixture.componentInstance, 'formReset');
  }));

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialize the bookForm', () => {
    const form = fixture.componentInstance.bookForm;
    expect(form).toBeTruthy();
    expect(form.value).toEqual({
      title: '',
      author: '',
      publication_date: '',
      genre: '',
      publisher: '',
    });
  });

  it('should set formType to "Add" and open the modal with empty form when openBookModal() is called with no book', () => {
    fixture.componentInstance.openBookModal();
    expect(fixture.componentInstance.formType).toBe('Add');
    expect(fixture.componentInstance.bookForm.value).toEqual({
      title: '',
      author: '',
      publication_date: '',
      genre: '',
      publisher: '',
    });
  });

  it('should set formType to "Update" and open the modal with pre-filled form when openBookModal() is called with a book', () => {
    const book = {
      title: 'Book Title',
      author: 'Author',
      publication_date: '2023-07-23',
      genre: 'Genre',
      publisher: 'Publisher',
    };

    fixture.componentInstance.openBookModal(book);

    expect(fixture.componentInstance.formType).toBe('Update');
    expect(fixture.componentInstance.bookForm.value).toEqual(book);
  });

  it('should dispatch addBook action on form submit when formType is "Add"', () => {
    const formSubmitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    const validBook = {
      title: 'Book Title',
      author: 'Author',
      publication_date: '2023-07-23',
      genre: 'Genre',
      publisher: 'Publisher',
    };

    fixture.componentInstance.formType = 'Add';

    fixture.componentInstance.bookForm.setValue(validBook);

    fireEvent.click(formSubmitButton);

    expect(dispatchSpy).toHaveBeenCalledWith(addBook({ book: validBook }));
  });

  it('should dispatch updateBook action on form submit when formType is "Update"', () => {
    const formSubmitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    const validBook = {
      title: 'Book Title',
      author: 'Author',
      publication_date: '2023-07-23',
      genre: 'Genre',
      publisher: 'Publisher',
    };

    fixture.componentInstance.formType = 'Update';

    fixture.componentInstance.bookForm.setValue(validBook);

    fireEvent.click(formSubmitButton);

    expect(dispatchSpy).toHaveBeenCalledWith(updateBook({ book: validBook }));
  });

  it('should dispatch deleteBook action on Delete button click when formType is "Update"', () => {
    fixture.componentInstance.formType = 'Update';
    fixture.detectChanges();

    const deleteButton =
      fixture.nativeElement.querySelector('#deleteBookButton');

    fireEvent.click(deleteButton);

    expect(dispatchSpy).toHaveBeenCalledWith(
      deleteBook({
        title: fixture.componentInstance.bookForm.getRawValue().title,
      })
    );
  });

  it('should close the modal and reset the form when formReset() is called', () => {
    fixture.componentInstance.formReset();

    expect(formResetSpy).toHaveBeenCalledTimes(1);
    const modalElement = fixture.nativeElement.querySelector('#bookModal');
    const hasHiddenClass = modalElement.classList.contains('hidden');
    expect(hasHiddenClass).toBe(true);
    expect(fixture.componentInstance.bookForm.value).toEqual({
      title: '',
      author: '',
      publication_date: '',
      genre: '',
      publisher: '',
    });
  });

  it('should show required error messages for form fields when touched and invalid', () => {
    const formSubmitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    fireEvent.click(formSubmitButton);
    expect(fixture.nativeElement.textContent).toContain('*Required');
  });
});
