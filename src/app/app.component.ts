import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { BookComponent } from './book/book.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HeaderComponent, BookComponent],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
