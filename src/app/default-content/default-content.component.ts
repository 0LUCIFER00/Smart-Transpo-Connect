import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageNavComponent } from '../image-nav/image-nav.component';
import { LicenseServicesComponent } from '../license-services/license-services.component';
import { VehicleServicesComponent } from '../vehicle-services/vehicle-services.component';
import { ManufacturerServicesComponent } from '../manufacturer-services/manufacturer-services.component';
import { InformationalServicesComponent } from '../informational-services/informational-services.component';

@Component({
  selector: 'app-default-content',
  imports: [CommonModule, LicenseServicesComponent, VehicleServicesComponent, ManufacturerServicesComponent, InformationalServicesComponent],
  templateUrl: './default-content.component.html',
  styleUrl: './default-content.component.css'
})
export class DefaultContentComponent {

}
