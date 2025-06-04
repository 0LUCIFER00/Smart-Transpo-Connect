import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrackItemComponent } from './track-item/track-item.component';

@Component({
  selector: 'app-fuel-track',
  imports: [FormsModule, CommonModule, TrackItemComponent],
  templateUrl: './fuel-track.component.html',
  styleUrl: './fuel-track.component.css',
})
export class FuelTrackComponent {
  fuelTypes = [
    { value: 'all', name: 'All Fuels' },
    { value: 'petrol', name: 'Petrol' },
    { value: 'diesel', name: 'Diesel' },
    { value: 'cng', name: 'CNG' },
    { value: 'autogas', name: 'Auto Gas' },
    { value: 'lpg', name: 'LPG' },
  ];

  states = [
    { value: '', name: 'Select State' },
    { value: 'delhi', name: 'Delhi' },
    { value: 'mumbai', name: 'Mumbai' },
    { value: 'bangalore', name: 'Bangalore' },
    { value: 'hyderabad', name: 'Hyderabad' },
    { value: 'chennai', name: 'Chennai' },
    // Add more states as needed
  ];

  selectedFuelType = 'all';
  selectedState = '';
  cityName = '';

   samplePrices = [
    { fuelType: 'petrol', state: 'delhi', city: 'Delhi', price: 94.81, date: '2024-05-28' },
    { fuelType: 'diesel', state: 'delhi', city: 'Delhi', price: 87.62, date: '2024-05-28' },
    { fuelType: 'cng', state: 'delhi', city: 'Delhi', price: 74.5, date: '2024-05-28' },
    { fuelType: 'petrol', state: 'maharashtra', city: 'Mumbai', price: 103.49, date: '2024-05-28' },
    { fuelType: 'diesel', state: 'maharashtra', city: 'Mumbai', price: 94.14, date: '2024-05-28' }
  ];

  searchResults: any[] = [];

  onSubmit() {
    const fuel = this.selectedFuelType;
    const state = this.selectedState.toLowerCase();
    const city = this.cityName.trim().toLowerCase();

    if (fuel === 'all') {
      // For 'all', group one entry per fuel type (e.g., Petrol, Diesel, etc.)
      const fuelTypes = ['petrol', 'diesel', 'cng', 'autogas', 'lpg'];
      this.searchResults = fuelTypes.map((type) => {
        const match = this.samplePrices.find(
          (item) =>
            item.fuelType === type &&
            item.state.toLowerCase() === state &&
            item.city.toLowerCase() === city
        );
        return (
          match || { fuelType: type, state, city, price: 'N/A', date: '-' }
        );
      });
    } else {
      // Filter specific fuel type
      this.searchResults = this.samplePrices.filter(
        (item) =>
          item.fuelType === fuel &&
          item.state.toLowerCase() === state &&
          item.city.toLowerCase() === city
      );
    }

    console.log('Search Results:', this.searchResults);

    // Here you would typically call a service to fetch fuel prices
  }
}
