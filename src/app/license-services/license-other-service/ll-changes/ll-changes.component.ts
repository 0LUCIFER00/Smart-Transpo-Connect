import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BackBtnComponent } from '../../../shared/back-btn/back-btn.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ll-change',
  templateUrl: './ll-changes.component.html',
  styleUrls: ['./ll-changes.component.css'],
  imports: [ReactiveFormsModule, BackBtnComponent, FormsModule, CommonModule],
})
export class LlChangesComponent {
  step = 1;
  maxStep = 4;
  payed = false;
  llVerified = false;

  llVerifyForm: FormGroup;
  llChangeForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.llVerifyForm = this.fb.group({
      llNumber: ['', Validators.required],
      dob: ['', Validators.required],
    });

    this.llChangeForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      reason: ['', Validators.required],
      changes: this.fb.array([this.createChangeGroup()]),
      paymentMethod: ['UPI'],
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

  // Form array getter
  get changes(): FormArray {
    return this.llChangeForm.get('changes') as FormArray;
  }

  // Create a change entry
  createChangeGroup(): FormGroup {
    return this.fb.group({
      changeType: ['', Validators.required],
      oldData: ['', Validators.required],
      newData: ['', Validators.required],
    });
  }

  // Add change group
  addChange(): void {
    this.changes.push(this.createChangeGroup());
  }

  // Remove specific change group
  removeChange(index: number): void {
    this.changes.removeAt(index);
  }

  // Navigation
  nextStep(): void {
    if (this.step < this.maxStep) this.step++;
  }

  prevStep(): void {
    if (this.step > 1) this.step--;
  }

  // Verification
  verifyLL(): void {
    if (this.llVerifyForm.invalid) {
      alert('Please enter both LL Number and DOB.');
      return;
    }

    const payload = this.llVerifyForm.value;

    this.http
      .post<any>('http://localhost:3000/api/verify-ll-change', payload)
      .subscribe({
        next: (res) => {
          alert(res.message || 'LL verification successful');
          this.llVerified = true;

          // Optional: pre-fill form fields if backend returns data
          if (res.data) {
            this.llChangeForm.patchValue({
              contact: res.data.contact || '',
              reason: res.data.reason || '',
            });
          }
        },
        error: (err) => {
          alert(err.error?.message || 'LL verification failed');
        },
      });
  }

  // Payment mock
  payment(): void {
    // Mock payment success
    this.payed = true;
    alert('Payment of ₹50 successful.');
  }

  // Submit final application
  submitApplication(): void {
    if (this.llChangeForm.invalid) {
      alert('Please complete all required fields before submitting.');
      return;
    }
    const userId = Number(localStorage.getItem('userId'));

    const llChangeData = {
      userId,
      ...this.llChangeForm.value,
      llNumber: this.llVerifyForm.value.llNumber,
      dob: this.llVerifyForm.value.dob,
      submittedAt: new Date().toISOString(),
    };

    this.http.post<any>('http://localhost:3000/api/submit-ll-change',llChangeData).subscribe({
      next: (res) => {
        alert(res.message || 'LL Change application submitted successfully.');
        // Reset or redirect as needed
        this.llVerified = false;
        this.llVerifyForm.reset();
        this.llChangeForm.reset();
        this.step = 1;
        this.payed = false;
        this.router.navigate(['/home/dashborad']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Submission failed. Please try again.');
      },
    });
  }
}
