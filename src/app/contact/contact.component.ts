import { Component , OnInit} from '@angular/core';
import { AppStateService } from '../shared/app-state.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
    fontSize = 1;
  
    constructor(private appState: AppStateService) {}
  
    ngOnInit() {
      this.appState.fontSize$.subscribe(size => this.fontSize = size);
    }
}
