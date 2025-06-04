// File: dl-renewal.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BackBtnComponent } from '../../../shared/back-btn/back-btn.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dl-renewal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, BackBtnComponent],
  templateUrl: './dl-renewal.component.html',
  styleUrl: './dl-renewal.component.css',
})
export class DlRenewalComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  step = 1;
  maxStep = 4;
  dlVerified = false;
  payed = false;

  uploadedFiles: Record<string, File> = {};

  // Step 1: Verification Form
  dlVerifyForm = this.fb.group({
    dlNumber: ['', Validators.required],
    dob: ['', Validators.required],
  });

  // Renewal Form (Shown only after verification)
  renewalForm = this.fb.group({
    fullName: ['', Validators.required],
    aadhaarNumber: ['', Validators.required],
    address: ['', Validators.required],
    vehicleClass: ['', Validators.required],
    renewalReason: ['', Validators.required],
    documents: this.fb.group({
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

  constructor(private router: Router){}

  ngOnInit() {
    this.renewalForm.get('paymentMethod')?.valueChanges.subscribe((method) => {
      const upiId = this.renewalForm.get('upiId');
      const cardFields = [
        'cardNumber',
        'cardName',
        'cardExpiry',
        'cardCVV',
      ].map((f) => this.renewalForm.get(f));
      const bankFields = ['selectedBank', 'accountNumber', 'ifscCode'].map(
        (f) => this.renewalForm.get(f)
      );

      // Reset all
      upiId?.clearValidators();
      cardFields.forEach((f) => f?.clearValidators());
      bankFields.forEach((f) => f?.clearValidators());

      // Apply validators based on selected method
      if (method === 'UPI') {
        upiId?.setValidators([Validators.required]);
      } else if (method === 'Card') {
        cardFields.forEach((f) => f?.setValidators([Validators.required]));
      } else if (method === 'Bank') {
        bankFields.forEach((f) => f?.setValidators([Validators.required]));
      }

      // Update validity
      upiId?.updateValueAndValidity();
      cardFields.forEach((f) => f?.updateValueAndValidity());
      bankFields.forEach((f) => f?.updateValueAndValidity());
    });
  }

  payment(){
    this.payed = true;
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
          alert('DL Verified. You may now proceed to renewal.');

          this.dlVerified = true;
          // Optional: pre-fill user details if returned
          this.renewalForm.patchValue({
            fullName: res.data?.fullName || '',
            address: res.data?.address || '',
          });
        },
        error: (err) => {
          alert(err.error?.message || 'DL Verification Failed.');
        },
      });
  }

  nextStep() {
    if (this.step < this.maxStep) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.uploadedFiles[controlName] = input.files[0];
      this.renewalForm
        .get('documents')
        ?.get(controlName)
        ?.setValue(input.files[0]);
    }
  }
  


  submitApplication() {
  const formData = new FormData();
  const userId = Number(localStorage.getItem('userId'));
  const renewalId = this.dlVerifyForm.value;
  const renewalData = this.renewalForm.value;

  const appendIfExists = (key: string, value: any) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  };

  appendIfExists('userId', userId);
  appendIfExists('dlNumber', renewalId.dlNumber)
  appendIfExists('fullName', renewalData.fullName);
  appendIfExists('aadhaarNumber', renewalData.aadhaarNumber);
  appendIfExists('dob', renewalId.dob);
  appendIfExists('address', renewalData.address);
  appendIfExists('vehicleClass', renewalData.vehicleClass);
  appendIfExists('renewalReason', renewalData.renewalReason);
  appendIfExists('paymentMethod', renewalData.paymentMethod);

  if (renewalData.paymentMethod === 'UPI') {
    appendIfExists('upiId', renewalData.upiId);
  } else if (renewalData.paymentMethod === 'Card') {
    appendIfExists('cardNumber', renewalData.cardNumber);
    appendIfExists('cardName', renewalData.cardName);
    appendIfExists('cardExpiry', renewalData.cardExpiry);
    appendIfExists('cardCVV', renewalData.cardCVV);
  } else if (renewalData.paymentMethod === 'Bank') {
    appendIfExists('selectedBank', renewalData.selectedBank);
    appendIfExists('accountNumber', renewalData.accountNumber);
    appendIfExists('ifscCode', renewalData.ifscCode);
  }

  // Append files
  if (this.uploadedFiles['photo']) {
    formData.append('photo', this.uploadedFiles['photo']);
  }
  if (this.uploadedFiles['signature']) {
    formData.append('signature', this.uploadedFiles['signature']);
  }

  this.http.post('http://localhost:3000/api/renew-dl', formData).subscribe(
    res => {
      alert('Application submitted successfully!');
      this.router.navigate(['/home/dashborad']);
    },
    err => {
      console.error('Submission failed:', err);
      alert('Submission failed');
    }
  );
}


  cancel() {
    if (confirm('Cancel the renewal process?')) {
      this.renewalForm.reset();
      this.dlVerifyForm.reset();
      this.step = 1;
      this.dlVerified = false;
    }
  }
}
