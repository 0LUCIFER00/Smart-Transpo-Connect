import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-services',
  imports: [CommonModule, RouterModule],
  templateUrl: './vehicle-services.component.html',
  styleUrls: ['./vehicle-services.component.css'],
})
export class VehicleServicesComponent {
  services = [
    {
      title: 'Vehicle Registration',
      description: 'One click for all the vehicle related citizen services',
      imageUrl: 'https://parivahan.gov.in/parivahan//sites/default/files/images/v-new-vehicle-registration.png',
      buttonText: 'More',
      route: '/home/vehicle-services/vehicle-register'
    },
    {
      title: 'FancyNumber Allocation',
      description: 'Your favorite number for your favorite vehicle',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/Nbb6GF--0RuAmk01iqDuC-0iwjK-RshAZTnkTGbJ5U0.jpg',
      buttonText: 'More',
      route: '/home/vehicle-services/fancy-number'
    },
    {
      title: 'National Permit',
      description: 'Seamless online way for vehicle permits',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/3JRWmWmiSi9g4JTTRxCmjJsP4_Xs4306ai8EmqkErdA.jpg',
      buttonText: 'More',
      route: '/home/vehicle-services/national-permit'
    },
    {
      title: 'Other Services',
      description: 'Explore the services related to your vehicle here',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/ZIAY0XTiuJ7Fh-Y496hyAINPoeRkEhmM71lDCR8D1d8.jpg',
      buttonText: 'More',
      route: '/home/vehicle-services/vehicle-other-service'
    }
  ];
}