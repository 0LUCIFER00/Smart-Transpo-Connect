import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manufacturer-services',
  imports: [CommonModule],
  templateUrl: './manufacturer-services.component.html',
  styleUrls: ['./manufacturer-services.component.css']
})
export class ManufacturerServicesComponent {
  services = [
    {
      title: 'VLTD Maker',
      description: 'Track, Analyze and Optimize Vehicle through location',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/O4LJptx4ZIsScYJUBfxsVAWMo2b0--dmkwNmVIH4ENc.jpg',
      buttonText: 'More'
    },
    {
      title: 'SLD Maker',
      description: 'Speed Limiting Device Ecosystem',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/3IQh4nYYnjk1guJjwrsy6pEVE0E1K011TICoKWcFILQ.jpg',
      buttonText: 'More'
    },
    {
      title: 'CNG Maker',
      description: 'Make way for cleaner, greener fuel',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/USre1XRl-pId7Gyy6EoPNKFEytnZm6FkTb3G5mr0JyM.jpg',
      buttonText: 'More'
    },
    {
      title: 'Homologation',
      description: 'Complete Life Cycle of a vehicle',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/fn6ce5QWSxXcM19HqCJ9TdeBOL7VHe5lG7kWVzO-v48.jpg',
      buttonText: 'More'
    }
  ];
}