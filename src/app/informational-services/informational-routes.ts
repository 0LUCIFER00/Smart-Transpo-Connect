import { Routes } from '@angular/router';
import { InformationalServicesComponent } from './informational-services.component';
import { FuelTrackComponent } from './fuel-track/fuel-track.component';

export const informational: Routes = [
      { path: '', component: InformationalServicesComponent },
      {
        path: 'fuel-track', component: FuelTrackComponent
      }
    //   {
    //     path: 'new-license',
    //     loadChildren: () =>
    //       import('./new-license/new-license.routes').then((m) => m.new_license),
    //   },

    //   { path: 'driving-school', component: DrivingSchoolComponent },
    //   { path: 'online-test', component: OnlineTestComponent },
    //   { path: 'license-other-service',
    //     loadChildren: () =>
    //       import('./license-other-service/license-other.routes').then((m) => m.license_others),
    //    },
];

