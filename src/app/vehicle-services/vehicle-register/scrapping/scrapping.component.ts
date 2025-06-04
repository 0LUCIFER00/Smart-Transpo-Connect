import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackBtnComponent } from '../../../shared/back-btn/back-btn.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scrap-application',
  templateUrl: './scrapping.component.html',
  styleUrls: ['./scrapping.component.css'],
  imports: [BackBtnComponent, ReactiveFormsModule,CommonModule]
})
export class ScrappingComponent {
  scrapForm!: FormGroup;
  formSubmitted = false;
  
  // File name variables
  rcCopyFileName: string = '';
  identityProofFileName: string = '';
  consentFormFileName: string = '';

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.scrapForm = this.fb.group({
      vehicleNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/)]],
      chassisNumber: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      engineNumber: ['', Validators.required],
      ownerName: ['', Validators.required],
      state: ['', Validators.required],
      rto: ['', Validators.required],
      reason: ['', Validators.required],
      otherReason: [''],
      rcCopy: [null, Validators.required],
      identityProof: [null, Validators.required],
      consentForm: [null, Validators.required],
      declaration: [false, Validators.requiredTrue]
    });

    // Handle other reason field visibility
    this.scrapForm.get('reason')?.valueChanges.subscribe(value => {
      if (value === 'other') {
        this.scrapForm.get('otherReason')?.setValidators([Validators.required]);
      } else {
        this.scrapForm.get('otherReason')?.clearValidators();
        this.scrapForm.get('otherReason')?.reset();
      }
      this.scrapForm.get('otherReason')?.updateValueAndValidity();
    });
  }

  onFileChange(event: any, controlName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.scrapForm.patchValue({
        [controlName]: file
      });
      this.scrapForm.get(controlName)?.updateValueAndValidity();
      
      // Update the file name display
      switch(controlName) {
        case 'rcCopy':
          this.rcCopyFileName = file.name;
          break;
        case 'identityProof':
          this.identityProofFileName = file.name;
          break;
        case 'consentForm':
          this.consentFormFileName = file.name;
          break;
      }
    }
  }

  submitForm(): void {
    this.formSubmitted = true;
    
    if (this.scrapForm.valid) {
      const formData = new FormData();
      
      // Append all form values to FormData
      Object.keys(this.scrapForm.value).forEach(key => {
        if (key !== 'declaration') {
          const value = this.scrapForm.get(key)?.value;
          if (value instanceof File || typeof value === 'string' || typeof value === 'number') {
            formData.append(key, String(value));
          }
        }
      });

      // Here you would typically call your service to submit the form
      console.log('Form submitted:', formData);
      
      // Example service call:
      // this.scrapService.submitScrapApplication(formData).subscribe(
      //   response => {
      //     console.log('Success:', response);
      //   },
      //   error => {
      //     console.error('Error:', error);
      //   }
      // );
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.scrapForm);
    }
  }

  resetForm(): void {
    this.scrapForm.reset();
    this.formSubmitted = false;
    
    // Reset file names
    this.rcCopyFileName = '';
    this.identityProofFileName = '';
    this.consentFormFileName = '';
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}