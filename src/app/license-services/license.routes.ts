import { Routes } from '@angular/router';
import { LicenseServicesComponent } from './license-services.component';
import { DrivingSchoolComponent } from './driving-school/driving-school.component';
import { OnlineTestComponent } from './online-test/online-test.component';

export const license: Routes = [
      { path: '', component: LicenseServicesComponent },
      {
        path: 'new-license',
        loadChildren: () =>
          import('./new-license/new-license.routes').then((m) => m.new_license),
      },

      { path: 'driving-school', component: DrivingSchoolComponent },
      { path: 'online-test', component: OnlineTestComponent },
      { path: 'license-other-service',
        loadChildren: () =>
          import('./license-other-service/license-other.routes').then((m) => m.license_others),
       },
];

