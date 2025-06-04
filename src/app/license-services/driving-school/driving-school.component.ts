import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DrivingSchool, DrivingSchoolService } from './driving-school.service';

@Component({
  selector: 'app-driving-schools',
  templateUrl: './driving-school.component.html',
  styleUrls: ['./driving-school.component.css'],
  imports:[CommonModule,FormsModule]
})
export class DrivingSchoolComponent implements OnInit {
  drivingSchools: DrivingSchool[] = [];
  filteredSchools: DrivingSchool[] = [];
  loading = false;
  error: string | null = null;

  // Filters
  addressFilter = '';
  ratingFilter: number | null = null;

  constructor(private dsService: DrivingSchoolService) {}

  ngOnInit(): void {
    this.loading = true;
    this.dsService.getDrivingSchools().subscribe({
      next: (data) => {
        this.drivingSchools = data;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load driving schools';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
  const address = this.addressFilter.trim().toLowerCase();
  const rating = this.ratingFilter;

  const isFiltering = address.length > 0 || rating !== null;

  if (!isFiltering) {
    this.filteredSchools = [];
    return;
  }

  this.filteredSchools = this.drivingSchools.filter(school => {
    const addressMatch = school.address.city.toLowerCase().includes(address) ||
                         school.address.street.toLowerCase().includes(address) ||
                         school.address.state.toLowerCase().includes(address);

    const ratingMatch = rating === null || school.ratings >= rating;

    return addressMatch && ratingMatch;
  });
}


  onAddressFilterChange(value: string) {
    this.addressFilter = value;
    this.applyFilters();
  }

  onRatingFilterChange(value: string) {
    const parsed = Number(value);
    this.ratingFilter = isNaN(parsed) ? null : parsed;
    this.applyFilters();
  }
}
