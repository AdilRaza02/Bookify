import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AlertComponent {
  @Input() type: 'info' | 'error' = 'info';
  @Input() message: string = '';
}
