import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../shared/app-state.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  fontSize = 1;

  constructor(private appState: AppStateService) {}

  ngOnInit() {
    this.appState.fontSize$.subscribe(size => this.fontSize = size);
  }
}
