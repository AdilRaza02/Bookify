import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BookComponent } from './book/book.component';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from './store/books/book.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './store/books/book.effects';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookModalComponent } from './book-modal/book-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookComponent,
    AlertComponent,
    BookModalComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ books: bookReducer }),
    EffectsModule.forRoot([BookEffects]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
