import { Routes } from '@angular/router';
import { NewLicenseComponent } from './new-license.component';
import { LearnerLicenseComponent } from './learner-license/learner-license.component';
import { DrivingLicenseComponent } from './driving-license/driving-license.component';
import { LearnerLicenseGuard } from './learner-license.guard';
import { LicenseGuard } from '../license-guard.guard';
import { DrivingLicenseGuard } from './driving-license.guard';

export const new_license: Routes = [
  {
    path: '',
    children: [
      { path: '', component: NewLicenseComponent },
      { path: 'learner-license',component : LearnerLicenseComponent, canActivate: [LearnerLicenseGuard],
      },
      { path: 'driving-license', component: DrivingLicenseComponent, canActivate: [DrivingLicenseGuard,LicenseGuard] },
    ],
  },
];
