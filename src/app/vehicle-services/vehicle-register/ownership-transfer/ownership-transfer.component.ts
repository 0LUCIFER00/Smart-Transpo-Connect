import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackBtnComponent } from "../../../shared/back-btn/back-btn.component";

@Component({
  selector: 'app-ownership-transfer',
  imports: [CommonModule, ReactiveFormsModule, BackBtnComponent],
  templateUrl: './ownership-transfer.component.html',
  styleUrl: './ownership-transfer.component.css'
})
export class OwnershipTransferComponent {
  fb = inject(FormBuilder);

  reasons = ['Sale', 'Death', 'Auction'];

  transferProofFileName: string = '';
  insuranceFileName: string = '';
  pucFileName: string = '';
  addressProofFileName: string = '';
  deathCertificateFileName: string = '';
  auctionProofFileName: string = '';

  ownershipForm = this.fb.group({
    oldOwnerName: ['', Validators.required],
    newOwnerName: ['', Validators.required],
    vehicleNumber: ['', Validators.required],
    chassisNumber: ['', Validators.required],
    engineNumber: ['', Validators.required],
    reason: ['', Validators.required],
    dateOfTransfer: ['', Validators.required],
    buyerAddress: ['', Validators.required],
    buyerMobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    buyerEmail: [''],
    stateRTO: ['', Validators.required],
    proofFiles: this.fb.group({
      transferProof: [null, Validators.required],
      insurance: [null, Validators.required],
      puc: [null, Validators.required],
      addressProof: [null, Validators.required],
      deathCertificate: [null],
      auctionProof: [null]
    })
  });

  uploadedFiles: Record<string, File> = {};

  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    if (file) {
      // Update the appropriate file name property
      switch (fileType) {
        case 'transferProof':
          this.transferProofFileName = file.name;
          break;
        case 'insurance':
          this.insuranceFileName = file.name;
          break;
        case 'puc':
          this.pucFileName = file.name;
          break;
        case 'addressProof':
          this.addressProofFileName = file.name;
          break;
        case 'deathCertificate':
          this.deathCertificateFileName = file.name;
          break;
        case 'auctionProof':
          this.auctionProofFileName = file.name;
          break;
      }
    }
  }

  submitForm() {
    if (this.ownershipForm.valid) {
      const formData = new FormData();
      Object.entries(this.ownershipForm.value).forEach(([key, value]) => {
        if (key === 'proofFiles') {
          const proofs = value as Record<string, File>;
          Object.entries(proofs).forEach(([k, v]) => {
            if (v) formData.append(k, v);
          });
        } else {
          formData.append(key, value as string);
        }
      });

      console.log('Submitted ownership transfer:', this.ownershipForm.value);
      alert('Ownership transfer submitted successfully!');
      // You can now POST this formData to your backend
    } else {
      alert('Please complete all required fields correctly.');
    }
  }

}
