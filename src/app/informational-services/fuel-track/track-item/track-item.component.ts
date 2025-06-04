import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-item',
  imports: [CommonModule],
  templateUrl: './track-item.component.html',
  styleUrl: './track-item.component.css'
})
export class TrackItemComponent {
@Input() results: any[] = [];
}
