import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackBtnComponent } from '../../../shared/back-btn/back-btn.component';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-duplicate-dl',
  templateUrl: './dl-duplicate.component.html',
  styleUrl: './dl-duplicate.component.css',
  imports: [BackBtnComponent, CommonModule, FormsModule, ReactiveFormsModule],
})
export class DlDuplicateComponent implements OnInit {
  http = inject(HttpClient);

  dlVerifyForm!: FormGroup;
  duplicateForm!: FormGroup;
  dlVerified = false;
  step = 1;
  maxStep = 3;
  payed = false;
  uploadedFiles: { [key: string]: File } = {};

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.dlVerifyForm = this.fb.group({
      dlNumber: ['', Validators.required],
      dob: ['', Validators.required],
    });
    this.duplicateForm = this.fb.group({
      reason: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      documents: this.fb.group({
        firCopy: [null, Validators.required],
        addressProof: [null, Validators.required],
        photo: [null, Validators.required],
        signature: [null, Validators.required],
      }),
      paymentMethod: ['UPI', Validators.required],
      upiId: [''],
      cardNumber: [''],
      cardName: [''],
      cardExpiry: [''],
      cardCVV: [''],
      selectedBank: [''],
      accountNumber: [''],
      ifscCode: [''],
    });
  }

  verifyDL() {
    if (this.dlVerifyForm.invalid) {
      alert('Please enter valid DL Number and DOB.');
      return;
    }

    const { dlNumber, dob } = this.dlVerifyForm.value;
    this.http
      .post<any>('http://localhost:3000/api/verify-dl-renewal', {
        dlNumber,
        dob,
      })
      .subscribe({
        next: (res) => {
          alert('DL Verified. You may now proceed.');

          this.dlVerified = true;
          // Optional: pre-fill user details if returned
        },
        error: (err) => {
          alert(err.error?.message || 'DL Verification Failed.');
        },
      });
  }

  nextStep(): void {
    if (this.step < this.maxStep) {
      this.step++;
    }
  }

  prevStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  payment(): void {
    // Basic check before payment
    if (this.duplicateForm.get('paymentMethod')?.valid) {
      this.payed = true;
      alert('₹50 payment successful');
    } else {
      alert('Please select a payment method.');
    }
  }

  file: any;
  onFileChange(event: any, fieldName: string): void {
    this.file = event.target.files[0];
    if (this.file) {
      this.uploadedFiles[fieldName] = this.file;
      const docsGroup = this.duplicateForm.get('documents') as FormGroup;
      docsGroup.get(fieldName)?.setValue(this.file);
    }
  }

  submitApplication() {
    if (this.duplicateForm.valid) {
      const formData = new FormData();
      formData.append('dlNumber', this.dlVerifyForm.value.dlNumber);
      formData.append('dob', this.dlVerifyForm.value.dob);
      formData.append('reason', this.duplicateForm.value.reason);
      formData.append('contact', this.duplicateForm.value.contact);

      // Append uploaded files
      formData.append('firCopy', this.file.firCopy);
      formData.append('addressProof', this.file.addressProof);
      formData.append('photo', this.file.photo);
      formData.append('signature', this.file.signature);

      // Append payment details
      const payment = this.duplicateForm.value;
      formData.append('paymentMethod', payment.paymentMethod);
      formData.append('upiId', payment.upiId || '');
      formData.append('cardNumber', payment.cardNumber || '');
      formData.append('cardName', payment.cardName || '');
      formData.append('cardExpiry', payment.cardExpiry || '');
      formData.append('cardCVV', payment.cardCVV || '');
      formData.append('selectedBank', payment.selectedBank || '');
      formData.append('accountNumber', payment.accountNumber || '');
      formData.append('ifscCode', payment.ifscCode || '');

      this.http
        .post('http://localhost:3000/api/duplicate-dl', formData)
        .subscribe({
          next: (res) => {
            alert('Application submitted successfully');
            this.router.navigate(['/home/dashboard']);
          },
          error: (err) => {
            console.error(err);
            alert('Submission failed');
          },
        });
    }
  }
}
