import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BookEffects } from './app/store/books/book.effects';
import { EffectsModule } from '@ngrx/effects';
import { bookReducer } from './app/store/books/book.reducer';
import { StoreModule } from '@ngrx/store';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      StoreModule.forRoot({ books: bookReducer }),
      EffectsModule.forRoot([BookEffects])
    ),
  ],
}).catch((err) => console.error(err));
