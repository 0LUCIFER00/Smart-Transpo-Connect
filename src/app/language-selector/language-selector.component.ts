// language-selector.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
  standalone: true
})
export class LanguageSelectorComponent {
  selectedLanguage = 'en';
  @Output() languageChanged = new EventEmitter<string>();

  onLanguageChange() {
    this.languageChanged.emit(this.selectedLanguage);
  }
}