import { Component } from '@angular/core';
import { Book } from '../state/books/book.model';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ModelFormGroup } from './book-modal.types';
import { Store } from '@ngrx/store';
import { addBook, deleteBook, updateBook } from '../state/books/book.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class BookModalComponent {
  public bookForm!: ModelFormGroup<Book>;
  public formType: 'Add' | 'Update' = 'Add';

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.initBookForm();
  }

  initBookForm() {
    this.bookForm = this.formBuilder.nonNullable.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publication_date: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      genre: ['', Validators.required],
      publisher: ['', Validators.required],
    });
  }

  openBookModal(book?: Book) {
    this.formType = 'Add';
    if (book) {
      this.bookForm.setValue(book);
      this.formType = 'Update';
    }
    document.getElementById('bookModalButton')!.click();
  }

  formValidator(fieldName: string, type: string) {
    return (
      this.bookForm.get(fieldName)?.errors?.[type] &&
      this.bookForm.get(fieldName)?.touched
    );
  }

  onBookFormSubmit() {
    this.bookForm.markAllAsTouched();

    if (this.bookForm.valid) {
      switch (this.formType) {
        case 'Add':
          this.store.dispatch(addBook({ book: this.bookForm.value as Book }));
          break;

        case 'Update':
          this.store.dispatch(
            updateBook({ book: this.bookForm.value as Book })
          );
          break;
      }
      this.formReset();
    }
  }

  onBookFormDelete() {
    this.store.dispatch(
      deleteBook({ title: this.bookForm.getRawValue().title })
    );
    this.formReset();
  }

  formReset() {
    document.getElementById('bookModalCloseButton')!.click();
    this.bookForm.reset();
  }
}
