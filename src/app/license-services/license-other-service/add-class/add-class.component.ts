import { Component } from '@angular/core';
import { BackBtnComponent } from '../../../shared/back-btn/back-btn.component';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-class',
  imports: [BackBtnComponent,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.css',
})
export class AddClassComponent {
  covForm!: FormGroup;
  step = 1;
  maxStep = 4;

  vehicleClasses = [
    'Motorcycle Without Gear',
    'Motorcycle With Gear',
    'Light Motor Vehicle',
    'Transport Vehicle',
    'Medium Goods Vehicle',
    'Heavy Goods Vehicle',
    'Three Wheeler',
    'Tractor',
    'Others',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.covForm = this.fb.group({
      dlNumber: ['', Validators.required],
      dob: ['', Validators.required],
      personalInfo: this.fb.group({
        name: ['', Validators.required],
        contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      }),
      newClasses: this.fb.array([]), // Array of classes to be added
    });

    // Add one class by default
    this.addVehicleClass();
  }

  get newClasses(): FormArray {
    return this.covForm.get('newClasses') as FormArray;
  }

  addVehicleClass(): void {
    this.newClasses.push(
      this.fb.group({
        vehicleClass: ['', Validators.required],
        reason: ['', Validators.required],
      })
    );
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
    if (this.covForm.valid) {
      console.log('COV Application:', this.covForm.value);
      alert('Class of Vehicle addition submitted successfully!');
    } else {
      alert('Please complete all required fields.');
    }
  }
}
