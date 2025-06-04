import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackBtnComponent } from "../../../shared/back-btn/back-btn.component";
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-re-correction',
  imports: [BackBtnComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './re-correction.component.html',
  styleUrl: './re-correction.component.css'
})
export class ReCorrectionComponent {
  rcCorrectionForm: FormGroup;
  formSubmitted = false;
  
  // File name properties
  rcCopyFileName: string = '';
  proofDocumentFileName: string = '';

  constructor(private fb: FormBuilder) {
    this.rcCorrectionForm = this.fb.group({
      vehicleNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/)]],
      chassisNumber: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      currentOwnerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      correctOwnerName: [''],
      currentEngineNumber: ['', Validators.required],
      correctEngineNumber: [''],
      correctionReason: ['', [Validators.required, Validators.minLength(20)]],
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
        case 'rcCopy':
          this.rcCopyFileName = file.name;
          break;
        case 'proofDocument':
          this.proofDocumentFileName = file.name;
          break;
      }
    }
  }

  submitForm() {
    this.formSubmitted = true;
    
    if (this.rcCorrectionForm.valid && 
        this.rcCopyFileName && 
        this.proofDocumentFileName) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', {
        formData: this.rcCorrectionForm.value,
        files: {
          rcCopy: this.rcCopyFileName,
          proofDocument: this.proofDocumentFileName
        }
      });
      
      // Here you would typically call your API service
      // this.rcService.submitCorrection(this.rcCorrectionForm.value, files);
    } else {
      console.log('Form validation failed');
    }
  }

  resetForm() {
    this.rcCorrectionForm.reset({
      vehicleNumber: '',
      chassisNumber: '',
      currentOwnerName: '',
      correctOwnerName: '',
      currentEngineNumber: '',
      correctEngineNumber: '',
      correctionReason: '',
      declaration: false
    });
    this.rcCopyFileName = '';
    this.proofDocumentFileName = '';
    this.formSubmitted = false;
  }
}