import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learner-license',
  standalone: true,
  templateUrl: './driving-license.component.html',
  styleUrls: ['./driving-license.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class DrivingLicenseComponent {
  stepIndex = 0;

  authForm: FormGroup;
  scheduleForm: FormGroup;

  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  rtoCenters = [
    { id: 'KA01', name: 'Bangalore RTO' },
    { id: 'MH01', name: 'Mumbai RTO' },
  ];
  availableSlots = ['10:00 AM', '11:00 AM', '2:00 PM'];
  minDate = new Date().toISOString().split('T')[0];
  maxDate = new Date(new Date().setDate(new Date().getDate() + 30))
    .toISOString()
    .split('T')[0];

  fileFields = [
    { label: 'Age/Address Proof', controlName: 'ageProof' },
    { label: 'Photo', controlName: 'photo' },
    { label: 'Signature', controlName: 'signature' },
  ];
  fileData: { [key: string]: File | null } = {};

  paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card' },
    { id: 'upi', name: 'UPI' },
    { id: 'netbanking', name: 'Net Banking' },
  ];
  selectedMethod: string = '';
  acceptTerms: boolean = false;

  cardDetails = { number: '', name: '', expiry: '', cvv: '' };
  upiId: string = '';
  selectedBank: string = '';
  accountNumber: string = '';
  ifscCode: string = '';
  errorMessage: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.authForm = this.fb.group({
      llNumber: ['', Validators.required],
      llDate: ['', Validators.required],
      state: ['', Validators.required],
      aadhaarInput: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      otpInput: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      fullName: ['', Validators.required],
      dob: ['',Validators.required],
      address: ['', Validators.required],
      education: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      vehicleClass: ['', Validators.required],
      consent1: [false, Validators.requiredTrue],
      consent2: [false, Validators.requiredTrue],
      consent3: [false, Validators.requiredTrue],
    });

    this.scheduleForm = this.fb.group({
      rtoCenter: ['', Validators.required],
      testDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
    });
  }

  // Step 1: OTP generation (mock)
  generateOTP() {
    alert('OTP generated!');
  }

  // Step 1 submission
  onAuthenticateSubmit() {
    if( this.authForm.valid ) {
  const rawDate = this.authForm.value.llDate;
  const formattedDate = rawDate
    ? new Date(rawDate).toISOString().split('T')[0]  // Format as "YYYY-MM-DD"
    : null;

  const payload = {
    llNumber: this.authForm.value.llNumber.toString(),   // keep as string
    llDate: formattedDate,
    aadhaarInput: this.authForm.value.aadhaarInput,
    fullName: this.authForm.value.fullName,
    dob: this.authForm.value.dob,
    address: this.authForm.value.address,
    education: this.authForm.value.education,
    bloodGroup: this.authForm.value.bloodGroup,
    vehicleClass: this.authForm.value.vehicleClass,
  };

  console.log('Payload sent:', payload);

  if (!payload.llDate) {
    alert('Please enter a valid LL Date');
    return;
  }

  this.http.post('http://localhost:3000/api/verify-ll-details', payload).subscribe({
    next: (res: any) => {
      console.log('Verified:', res);
      this.stepIndex = 2; // proceed to next step
    },
    error: (err) => {
      console.error('Error:', err);
      alert(err.error.message);
    }
  });
}else{
  alert('Please enter valid input...');
}
}


  // Handle file input changes for uploads
  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.fileData[controlName] = file;
    }
  }

  // Step 3: Schedule Test - select time slot
  selectTimeSlot(slot: string) {
    this.scheduleForm.patchValue({ timeSlot: slot });
  }

  // Step 3: Schedule test submission
  scheduleTest() {
    if (this.scheduleForm.valid) {
      console.log('Scheduled:', this.scheduleForm.value);
      // Optionally reset or navigate elsewhere
    } else {
      alert('Please complete scheduling details.');
    }
  }

  // Payment method selection helper
  selectPaymentMethod(methodId: string): void {
    this.selectedMethod = methodId;
    // Reset all payment details on method change
    this.cardDetails = { number: '', name: '', expiry: '', cvv: '' };
    this.upiId = '';
    this.selectedBank = '';
    this.accountNumber = '';
    this.ifscCode = '';
  }

  // Step 2: Payment submission
  proceedToPay(): void {
    if (!this.acceptTerms) {
      alert('Please accept the terms to proceed.');
      return;
    }

    switch (this.selectedMethod) {
      case 'card':
        if (
          !this.cardDetails.number.match(/^\d{16}$/) ||
          !this.cardDetails.name.trim() ||
          !this.cardDetails.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/) ||
          !this.cardDetails.cvv.match(/^\d{3}$/)
        ) {
          alert('Please fill in all valid card details.');
          return;
        }
        break;

      case 'upi':
        if (!this.upiId.match(/^[a-zA-Z0-9.-]{2,256}@[a-zA-Z]{2,64}$/)) {
          alert('Please enter a valid UPI ID.');
          return;
        }
        break;

      case 'netbanking':
        if (
          !this.selectedBank ||
          !this.accountNumber.match(/^\d{10}$/) ||
          !this.ifscCode.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)
        ) {
          alert('Please complete all valid netbanking details.');
          return;
        }
        break;

      default:
        alert('Please select a payment method.');
        return;
    }

    alert('Payment successful!');
    this.stepIndex = 3;
  }

  // Final submission of entire application
   submitApplication() {
    const userId = this.authService.getLoggedInUserId();

    if (!userId) {
      alert('User not logged in!');
      return;
    }

    const formData = new FormData();

    formData.append('userId', userId.toString());
    formData.append('state', this.authForm.value.state);
    formData.append('aadhaarNumber', this.authForm.value.aadhaarInput);
    formData.append('fullName', this.authForm.value.fullName);
    formData.append('dob', this.authForm.value.dob);
    formData.append('address', this.authForm.value.address);
    formData.append('education', this.authForm.value.education);
    formData.append('bloodGroup', this.authForm.value.bloodGroup);
    formData.append('vehicleClass', this.authForm.value.vehicleClass);
    formData.append('paymentMethod', this.selectedMethod);
    formData.append('upiId', this.upiId);
    formData.append('cardNumber', this.cardDetails.number);
    formData.append('cardName', this.cardDetails.name);
    formData.append('cardExpiry', this.cardDetails.expiry);
    formData.append('cardCVV', this.cardDetails.cvv);
    formData.append('selectedBank', this.selectedBank);
    formData.append('accountNumber', this.accountNumber);
    formData.append('ifscCode', this.ifscCode);
    formData.append('rtoCenterId', this.scheduleForm.value.rtoCenter);
    formData.append('testDate', this.scheduleForm.value.testDate);
    formData.append('timeSlot', this.scheduleForm.value.timeSlot);

    // Append files
    if (this.fileData['ageProof']) {
      formData.append('ageProof', this.fileData['ageProof']);
    }
    if (this.fileData['photo']) {
      formData.append('photo', this.fileData['photo']);
    }
    if (this.fileData['signature']) {
      formData.append('signature', this.fileData['signature']);
    }

    this.http.post('http://localhost:3000/api/submit-dl-application', formData).subscribe({
      next: (res: any) => {
        alert(`Application submitted successfully! DL Number: ${res.dlNumber}`);
        this.router.navigate(['/home/dashborad']);
        this.stepIndex = 0;
        this.authForm.reset();
        this.scheduleForm.reset();
        this.fileData = {};
        this.selectedMethod = '';
        this.cardDetails = { number: '', name: '', expiry: '', cvv: '' };
        this.upiId = '';
        this.selectedBank = '';
        this.accountNumber = '';
        this.ifscCode = '';
      },
      error: (err) => {
        alert('Failed to submit application.');
        console.error(err);
      }
    });
  }


  // Cancel button handler (resets the form and returns to step 0)
  onCancel() {
    if (confirm('Are you sure you want to cancel the application?')) {
      this.stepIndex = 0;
      this.authForm.reset();
      this.scheduleForm.reset();
      this.selectedMethod = '';
      this.acceptTerms = false;
      this.fileData = {};
      this.cardDetails = { number: '', name: '', expiry: '', cvv: '' };
      this.upiId = '';
      this.selectedBank = '';
      this.accountNumber = '';
      this.ifscCode = '';
    }
  }
}
