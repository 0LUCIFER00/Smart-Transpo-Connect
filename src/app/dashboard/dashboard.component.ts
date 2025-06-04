import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  application: any = null;
  dlapplication: any = null;
  activeReceipt: 'll' | 'dl' | null = null;

  @ViewChild('receiptContent', { static: false }) receiptContent!: ElementRef;
  userId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getLoggedInUserId();
    this.loadLLReceipt();
  }

  loadLLReceipt() {
    if (!this.userId) return;
    this.http.get(`http://localhost:3000/api/learner-license/${this.userId}`).subscribe({
      next: (data) => {
        this.application = data;
        this.activeReceipt = 'll';
      },
      error: (err) => {
        alert('Failed to load LL application.');
        console.error(err);
      },
    });
  }

  loadDLReceipt() {
    if (!this.userId) return;
    this.http.get(`http://localhost:3000/api/driving-license/${this.userId}`).subscribe({
      next: (data) => {
        this.dlapplication = data;
        this.activeReceipt = 'dl';
      },
      error: (err) => {
        alert('Failed to load DL application.');
        console.error(err);
      },
    });
  }

  downloadPDF() {
    const element = this.receiptContent.nativeElement;
    const opt = {
      margin: 0.5,
      filename: `${this.activeReceipt}-license-receipt.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
  }
}
