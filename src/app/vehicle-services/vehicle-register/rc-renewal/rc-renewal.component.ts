import { Component } from '@angular/core';
import { BackBtnComponent } from "../../../shared/back-btn/back-btn.component";
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-rc-renewal',
  imports: [BackBtnComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './rc-renewal.component.html',
  styleUrl: './rc-renewal.component.css'
})
export class RcRenewalComponent {
  renewalForm: FormGroup;
  reasons = ['Normal Renewal', 'Lost RC', 'Damaged RC', 'Change of Details', 'Other'];
  formSubmitted = false;
  
  // File name properties
  expiredRcCopyFileName: string = '';
  insuranceCertificateFileName: string = '';
  pucCertificateFileName: string = '';
  addressProofFileName: string = '';

  constructor(private fb: FormBuilder) {
    this.renewalForm = this.fb.group({
      vehicleNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/)]],
      chassisNumber: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      ownerName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      reason: ['', Validators.required]
    });
  }

  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    if (file) {
      switch (fileType) {
        case 'expiredRcCopy':
          this.expiredRcCopyFileName = file.name;
          break;
        case 'insuranceCertificate':
          this.insuranceCertificateFileName = file.name;
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

  submitForm() {
    this.formSubmitted = true;
    
    if (this.renewalForm.valid && 
        this.expiredRcCopyFileName && 
        this.insuranceCertificateFileName && 
        this.pucCertificateFileName && 
        this.addressProofFileName) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', {
        formData: this.renewalForm.value,
        files: {
          expiredRcCopy: this.expiredRcCopyFileName,
          insuranceCertificate: this.insuranceCertificateFileName,
          pucCertificate: this.pucCertificateFileName,
          addressProof: this.addressProofFileName
        }
      });
      
      // Here you would typically call your API service
      // this.rcService.submitRenewal(this.renewalForm.value, files);
    }
  }

  resetForm() {
    this.renewalForm.reset();
    this.expiredRcCopyFileName = '';
    this.insuranceCertificateFileName = '';
    this.pucCertificateFileName = '';
    this.addressProofFileName = '';
    this.formSubmitted = false;
  }
}