import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { BackBtnComponent } from '../../../shared/back-btn/back-btn.component';

@Component({
  selector: 'app-dl-changes',
  templateUrl: './dl-changes.component.html',
  styleUrls: ['./dl-changes.component.css'],
  imports: [ReactiveFormsModule,CommonModule,BackBtnComponent],
})
export class DlChangesComponent implements OnInit {
  dlChangeForm!: FormGroup;
  step = 1;
  maxStep = 5;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dlChangeForm = this.fb.group({
      dlNumber: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      reason: ['', Validators.required],
      changes: this.fb.array([]) // FormArray for dynamic changes
    });

    // Add one change row by default
    this.addChange();
  }

  get changes(): FormArray {
    return this.dlChangeForm.get('changes') as FormArray;
  }

  addChange(): void {
    this.changes.push(this.fb.group({
      changeType: ['', Validators.required],
      oldData: ['', Validators.required],
      newData: ['', Validators.required]
    }));
  }

  nextStep(): void {
    if (this.step < this.maxStep) {
      this.step++;
    }
  }

  prevStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  submitApplication(): void {
    if (this.dlChangeForm.valid) {
      console.log('DL Change Application Submitted:', this.dlChangeForm.value);
      alert('DL Change Application submitted successfully!');
    } else {
      alert('Please fill all required fields.');
    }
  }
}
