import { Component } from '@angular/core';
import { BackBtnComponent } from "../../shared/back-btn/back-btn.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-register',
  standalone: true,
  imports: [CommonModule, RouterModule, BackBtnComponent],
  templateUrl: './vehicle-register.component.html',
  styleUrl: './vehicle-register.component.css'
})
export class VehicleRegisterComponent {
  services = [
    {
      title: 'New Vehicle Registration',
      description: 'Apply for registration of a new vehicle.',
      imageUrl: 'https://images.unsplash.com/photo-1602407294553-6b6c30e768a3?auto=format&fit=crop&w=800&q=60',
      buttonText: 'Apply Now',
      route: 'new-registration'
    },
    {
      title: 'Transfer of Ownership',
      description: 'Transfer vehicle ownership due to sale, death, or auction.',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/ownership-transfer.jpg',
      buttonText: 'Transfer',
      route: 'ownership-transfer'
    },
    // {
    //   title: 'Temporary to Permanent Registration',
    //   description: 'Convert temporary registration to permanent.',
    //   imageUrl: 'https://storage.googleapis.com/a1aa/image/temp-perm.jpg',
    //   buttonText: 'Convert',
    //   route: 'temp-to-perm'
    // },
    {
      title: 'Renew Registration Certificate (RC)',
      description: 'Renew expired RC for your vehicle.',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/rc-renewal.jpg',
      buttonText: 'Renew',
      route: 'rc-renewal'
    },
    {
      title: 'Duplicate RC',
      description: 'Apply for a duplicate RC if lost or damaged.',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/duplicate-rc.jpg',
      buttonText: 'Apply',
      route: 'duplicate-rc'
    },
    {
      title: 'Change Address in RC',
      description: 'Update your address in vehicle registration records.',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/address-change.jpg',
      buttonText: 'Update',
      route: 'address-change'
    },
    {
      title: 'Correction in RC Details',
      description: 'Correct errors in RC such as name, engine number, etc.',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/correction-rc.jpg',
      buttonText: 'Correct',
      route: 'rc-correction'
    },
    {
      title: 'Apply for NOC',
      description: 'Get No Objection Certificate for interstate vehicle transfer.',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/noc.jpg',
      buttonText: 'Apply',
      route: 'noc'
    },
    // {
    //   title: 'Re-registration (Other State Vehicle)',
    //   description: 'Re-register vehicle from a different state.',
    //   imageUrl: 'https://storage.googleapis.com/a1aa/image/reregistration.jpg',
    //   buttonText: 'Re-register',
    //   route: 're-registration'
    // },
    {
      title: 'Vehicle Scrapping Certificate',
      description: 'Scrap your old vehicle and get a certificate.',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/vehicle-scrap.jpg',
      buttonText: 'Scrap Now',
      route: 'scrapping'
    }
  ];
}
