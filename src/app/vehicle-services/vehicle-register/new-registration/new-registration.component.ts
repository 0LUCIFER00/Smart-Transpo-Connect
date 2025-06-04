import { Component } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BackBtnComponent } from "../../../shared/back-btn/back-btn.component";
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-registration',
  imports: [ReactiveFormsModule, CommonModule, BackBtnComponent],
  templateUrl: './new-registration.component.html',
  styleUrl: './new-registration.component.css',
})
export class NewRegistrationComponent {
  vehicleForm: FormGroup;
  currentStep = 0;
  steps = [
    'State Selection',
    'Owner Details',
    'Vehicle Details',
    'Dealer & Purchase Details',
    'Insurance Details',
    'PUC',
    'Upload Documents',
    'Tax Details',
    'Declaration',
  ];

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
  uploadedFiles: { [key: string]: File } = {};

  maxDob: string | undefined;

  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = today.getMonth() + 1;
    const day = today.getDate();
    this.maxDob = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router) {
    this.vehicleForm = this.fb.group({
      // Step 1
      state: ['', Validators.required],

      // Step 2
      ownerName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      fatherName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      dob: ['', [Validators.required, this.minimumAgeValidator(18)]],
      gender: ['', Validators.required],
      address: ['', Validators.required],

      // Step 3
      vehicleType: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      fuelType: ['', Validators.required],
      engineNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{4,}$/)],
      ],
      chassisNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{4,}$/)],
      ],
      yearOfManufacture: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      color: ['', Validators.required],
      seatingCapacity: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      cc: [
        '',
        [Validators.required, Validators.min(50), Validators.max(10000)],
      ],

      // Step 4
      dealerName: ['', Validators.required],
      invoiceNumber: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      purchaseDate: ['', Validators.required],

      // Step 5
      insuranceCompany: ['', Validators.required],
      policyNumber: ['', Validators.required],
      insuranceStart: ['', Validators.required],
      insuranceEnd: ['', Validators.required],

      // Step 6
      pucNumber: ['', Validators.required],
      pucIssue: ['', Validators.required],
      pucValidTill: ['', Validators.required],

      // Step 7 – Files
      addressProof: [null],
      insuranceCertificate: [null],
      pucCertificate: [null],

      // Step 8
      roadTax: ['', [Validators.required, Validators.min(0)]],
      paymentRef: ['', Validators.required], // or use pattern(/^\d+$/) if strictly numeric

      // Step 9
      declaration: [false, Validators.requiredTrue],
    });
  }

  nextStep() {
    if (this.isCurrentStepValid() && this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  minimumAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const dob = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age >= minAge
        ? null
        : { minAge: { requiredAge: minAge, actualAge: age } };
    };
  }

  isCurrentStepValid(): boolean {
    const stepControls = [
      ['state'],
      ['ownerName', 'fatherName', 'dob', 'gender', 'address'],
      [
        'vehicleType',
        'manufacturer',
        'model',
        'fuelType',
        'engineNumber',
        'chassisNumber',
        'yearOfManufacture',
        'color',
        'seatingCapacity',
        'cc',
      ],
      ['dealerName', 'invoiceNumber', 'invoiceDate', 'purchaseDate'],
      ['insuranceCompany', 'policyNumber', 'insuranceStart', 'insuranceEnd'],
      ['pucNumber', 'pucIssue', 'pucValidTill'],
      ['addressProof', 'insuranceCertificate', 'pucCertificate'],
      ['roadTax', 'paymentRef'],
      ['declaration'],
    ];

    const controlsToCheck = stepControls[this.currentStep];
    return controlsToCheck.every((ctrl) => this.vehicleForm.get(ctrl)?.valid);
  }

  getControlsForCurrentStep(): string[] {
    const stepControls = [
      ['state'],
      ['ownerName', 'fatherName', 'dob', 'gender', 'address'],
      [
        'vehicleType',
        'manufacturer',
        'model',
        'fuelType',
        'engineNumber',
        'chassisNumber',
        'yearOfManufacture',
        'color',
        'seatingCapacity',
        'cc',
      ],
      ['dealerName', 'invoiceNumber', 'invoiceDate', 'purchaseDate'],
      ['insuranceCompany', 'policyNumber', 'insuranceStart', 'insuranceEnd'],
      ['pucNumber', 'pucIssue', 'pucValidTill'],
      [], // Step 7: File uploads handled separately
      ['roadTax', 'paymentRef'],
      ['declaration'],
    ];
    return stepControls[this.currentStep];
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF, JPG, and PNG files are allowed.');
        this.vehicleForm.get(controlName)?.setValue(null);
        return;
      }

      if (file.size > maxSize) {
        alert('File size must be less than 5MB.');
        this.vehicleForm.get(controlName)?.setValue(null);
        return;
      }

      this.vehicleForm.get(controlName)?.setValue(file);
    }
  }

  onSubmit() {
    if (this.vehicleForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    const userId = this.authService.getLoggedInUserId();
    Object.entries(this.vehicleForm.value).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });
    formData.append('userId', userId!.toString());
    this.http.post('http://localhost:3000/api/vehicle-registration', formData).subscribe({
      next: () => {
        alert('Vehicle registration submitted successfully!');
        this.vehicleForm.reset();
        this.router.navigate(['home/dashboard'])
      },
      error: (err) => {
        console.error(err);
        alert('Error submitting form');
      }
    });
  }
}
