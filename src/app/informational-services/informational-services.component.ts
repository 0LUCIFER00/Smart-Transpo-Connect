import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-informational-services',
  imports: [CommonModule, RouterModule],
  templateUrl: './informational-services.component.html',
  styleUrls: ['./informational-services.component.css']
})
export class InformationalServicesComponent {
  services = [
    {
      title: 'Fuel Price Tracker',
      description: 'Check daily updated petrol and diesel prices across major Indian cities instantly.',
      imageUrl: 'https://cdn3.vectorstock.com/i/1000x1000/34/67/gasoline-pump-gas-station-icon-design-symbol-vector-27823467.jpg',
      buttonText: 'More',
      route: 'fuel-track'
    },
    {
      title: 'Fancy Number Allocation',
      description: 'Your favorite number for your favorite vehicle',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/Nbb6GF--0RuAmk01iqDuC-0iwjK-RshAZTnkTGbJ5U0.jpg',
      buttonText: 'More'
    },
    {
      title: 'National Permit',
      description: 'Seamless online way for vehicle permits',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/3JRWmWmiSi9g4JTTRxCmjJsP4_Xs4306ai8EmqkErdA.jpg',
      buttonText: 'More'
    },
    {
      title: 'Additional Services',
      description: 'Explore the services related to your vehicle here',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/ZIAY0XTiuJ7Fh-Y496hyAINPoeRkEhmM71lDCR8D1d8.jpg',
      buttonText: 'More'
    }
  ];
}