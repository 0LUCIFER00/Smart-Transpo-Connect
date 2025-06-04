import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { BackBtnComponent } from "../../shared/back-btn/back-btn.component";

@Component({
  selector: 'app-new-license',
  imports: [CommonModule, RouterModule, BackBtnComponent, RouterLink],
  templateUrl: './new-license.component.html',
  styleUrl: './new-license.component.css'

})
export class NewLicenseComponent {
  services = [
    {
      title: 'Apply Learner License',
      description: 'License registration on your fingertips',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/19FtkFtH9hYmeg-yrjlN7pL4diBKkB2aRQR_5V5r_1Y.jpg',
      buttonText: 'More',
      route: 'learner-license' // Add route path
    },
    {
      title: 'Apply Driving License',
      description: 'One place for application of Driving School License',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/T8sp4vyfarrjGmQ0UX7iFpsqpy2TegBp5fn_UU2GEoY.jpg',
      buttonText: 'More',
      route: 'driving-license' // Add route path
    }
  ];
}
