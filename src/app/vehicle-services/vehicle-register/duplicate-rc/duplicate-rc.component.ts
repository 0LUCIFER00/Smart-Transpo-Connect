import { Component } from '@angular/core';
import { BackBtnComponent } from "../../../shared/back-btn/back-btn.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-duplicate-rc',
  imports: [BackBtnComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './duplicate-rc.component.html',
  styleUrl: './duplicate-rc.component.css'
})
export class DuplicateRcComponent {
  duplicateRCForm: FormGroup;
  reasons = ['Lost', 'Damaged', 'Stolen', 'Mutated', 'Other'];
  formSubmitted = false;
  
  // File name properties
  firCopyFileName: string = '';
  affidavitFileName: string = '';
  insuranceCopyFileName: string = '';
  pucCertificateFileName: string = '';
  addressProofFileName: string = '';

  constructor(private fb: FormBuilder) {
    this.duplicateRCForm = this.fb.group({
      vehicleNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/)]],
      chassisNumber: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      engineNumber: ['', Validators.required],
      ownerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      reason: ['', Validators.required]
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
        case 'firCopy':
          this.firCopyFileName = file.name;
          break;
        case 'affidavit':
          this.affidavitFileName = file.name;
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

  submitForm() {
    this.formSubmitted = true;
    
    // Check if FIR copy is required and uploaded
    const firCopyValid = this.duplicateRCForm.value.reason !== 'Lost' || 
                       (this.duplicateRCForm.value.reason === 'Lost' && this.firCopyFileName);
    
    if (this.duplicateRCForm.valid && 
        this.affidavitFileName && 
        this.insuranceCopyFileName && 
        this.pucCertificateFileName && 
        this.addressProofFileName &&
        firCopyValid) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', {
        formData: this.duplicateRCForm.value,
        files: {
          firCopy: this.firCopyFileName,
          affidavit: this.affidavitFileName,
          insuranceCopy: this.insuranceCopyFileName,
          pucCertificate: this.pucCertificateFileName,
          addressProof: this.addressProofFileName
        }
      });
      
      // Here you would typically call your API service
      // this.rcService.applyForDuplicate(this.duplicateRCForm.value, files);
    } else {
      console.log('Form validation failed');
    }
  }

  resetForm() {
    this.duplicateRCForm.reset();
    this.firCopyFileName = '';
    this.affidavitFileName = '';
    this.insuranceCopyFileName = '';
    this.pucCertificateFileName = '';
    this.addressProofFileName = '';
    this.formSubmitted = false;
  }
}