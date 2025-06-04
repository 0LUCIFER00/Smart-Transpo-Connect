import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackBtnComponent } from "../../../shared/back-btn/back-btn.component";
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-change',
  imports: [CommonModule, BackBtnComponent, ReactiveFormsModule],
  templateUrl: './address-change.component.html',
  styleUrl: './address-change.component.css'
})
export class AddressChangeComponent {
  addressForm: FormGroup;
  formSubmitted = false;
  
  // File name properties
  addressProofFileName: string = '';
  registrationCopyFileName: string = '';
  insuranceCopyFileName: string = '';
  pucCertificateFileName: string = '';

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      vehicleNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/)]],
      chassisNumber: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      engineNumber: ['', Validators.required],
      ownerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      oldAddress: ['', [Validators.required, Validators.minLength(10)]],
      newAddress: ['', [Validators.required, Validators.minLength(20)]],
      declaration: [false, Validators.requiredTrue]
    });
  }

  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024; // in MB
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, JPEG, or PNG file');
        return;
      }

      if (fileSize > 5) {
        alert('File size should not exceed 5MB');
        return;
      }

      switch (fileType) {
        case 'addressProof':
          this.addressProofFileName = file.name;
          break;
        case 'registrationCopy':
          this.registrationCopyFileName = file.name;
          break;
        case 'insuranceCopy':
          this.insuranceCopyFileName = file.name;
          break;
        case 'pucCertificate':
          this.pucCertificateFileName = file.name;
          break;
      }
    }
  }

  submitForm() {
    this.formSubmitted = true;
    
    if (this.addressForm.valid && 
        this.addressProofFileName && 
        this.registrationCopyFileName && 
        this.insuranceCopyFileName && 
        this.pucCertificateFileName) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', {
        formData: this.addressForm.value,
        files: {
          addressProof: this.addressProofFileName,
          registrationCopy: this.registrationCopyFileName,
          insuranceCopy: this.insuranceCopyFileName,
          pucCertificate: this.pucCertificateFileName
        }
      });
      
      // Here you would typically call your API service
      // this.rcService.changeAddress(this.addressForm.value, files);
    } else {
      console.log('Form validation failed');
    }
  }

  resetForm() {
    this.addressForm.reset({
      vehicleNumber: '',
      chassisNumber: '',
      engineNumber: '',
      ownerName: '',
      oldAddress: '',
      newAddress: '',
      declaration: false
    });
    this.addressProofFileName = '';
    this.registrationCopyFileName = '';
    this.insuranceCopyFileName = '';
    this.pucCertificateFileName = '';
    this.formSubmitted = false;
  }
}