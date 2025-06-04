import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackBtnComponent } from "../../../shared/back-btn/back-btn.component";
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-noc',
  imports: [BackBtnComponent, ReactiveFormsModule,CommonModule],
  templateUrl: './noc.component.html',
  styleUrl: './noc.component.css'
})
export class NocComponent {
  nocForm!: FormGroup;
  formSubmitted = false;
  
  // File name variables
  rcCopyFileName: string = '';
  insuranceCopyFileName: string = '';
  pucCertificateFileName: string = '';
  addressProofFileName: string = '';

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.nocForm = this.fb.group({
      vehicleNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/)]],
      chassisNumber: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      engineNumber: ['', Validators.required],
      ownerName: ['', Validators.required],
      fromState: ['', Validators.required],
      fromRTO: ['', Validators.required],
      toState: ['', Validators.required],
      toRTO: ['', Validators.required],
      reason: ['', Validators.required],
      rcCopy: [null, Validators.required],
      insuranceCopy: [null, Validators.required],
      pucCertificate: [null, Validators.required],
      addressProof: [null],
      declaration: [false, Validators.requiredTrue]
    });
  }

  onFileChange(event: any, controlName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.nocForm.patchValue({
        [controlName]: file
      });
      this.nocForm.get(controlName)?.updateValueAndValidity();
      
      // Update the file name display
      switch(controlName) {
        case 'rcCopy':
          this.rcCopyFileName = file.name;
          break;
        case 'insuranceCopy':
          this.insuranceCopyFileName = file.name;
          break;
        case 'pucCertificate':
          this.pucCertificateFileName = file.name;
          break;
        case 'addressProof':
          this.addressProofFileName = file.name;
          break;
      }
    }
  }

  submitForm(): void {
    this.formSubmitted = true;
    
    if (this.nocForm.valid) {
      // Prepare form data for submission
      const formData = new FormData();
      
      // Append all form values to FormData
      Object.keys(this.nocForm.value).forEach(key => {
        if (key !== 'declaration') { // Skip declaration as it's not needed in backend
          const value = this.nocForm.get(key)?.value;
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'string') {
            formData.append(key, value);
          } else if (typeof value === 'number') {
            formData.append(key, value.toString());
          }
        }
      });

      // Here you would typically call your service to submit the form
      console.log('Form submitted:', formData);
      
      // Example service call (uncomment and implement your service)
      // this.nocService.submitNOCApplication(formData).subscribe(
      //   response => {
      //     console.log('Success:', response);
      //     // Handle success (show success message, redirect, etc.)
      //   },
      //   error => {
      //     console.error('Error:', error);
      //     // Handle error (show error message)
      //   }
      // );
      
      // For demo purposes, just log the form values
      console.log('Form values:', this.nocForm.value);
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation messages
      this.markFormGroupTouched(this.nocForm);
    }
  }

  resetForm(): void {
    this.nocForm.reset();
    this.formSubmitted = false;
    
    // Reset file names
    this.rcCopyFileName = '';
    this.insuranceCopyFileName = '';
    this.pucCertificateFileName = '';
    this.addressProofFileName = '';
  }

  // Helper method to mark all form fields as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}