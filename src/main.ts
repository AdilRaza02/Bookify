import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { bookReducer } from './state/books/book.reducer';
import { BookEffects } from './state/books/book.effects';

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
