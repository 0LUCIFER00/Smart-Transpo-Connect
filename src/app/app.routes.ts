// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { VehicleServicesComponent } from './vehicle-services/vehicle-services.component';
import { ManufacturerServicesComponent } from './manufacturer-services/manufacturer-services.component';
import { InformationalServicesComponent } from './informational-services/informational-services.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehicleRegisterComponent } from './vehicle-services/vehicle-register/vehicle-register.component';
import { FancyNumberComponent } from './vehicle-services/fancy-number/fancy-number.component';
import { NationalPermitComponent } from './vehicle-services/national-permit/national-permit.component';
import { VehicleOtherServiceComponent } from './vehicle-services/vehicle-other-service/vehicle-other-service.component';
import { DefaultContentComponent } from './default-content/default-content.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login-register', pathMatch: 'full' },
  { path: 'login-register', component: LoginRegisterComponent },
  {
    path: 'home',
    children: [
      { path: '', component: DefaultContentComponent },
      {
        path: 'license-services', canActivate: [AuthGuard],
        loadChildren: () =>
          import('./license-services/license.routes').then((m) => m.license),
      },
      {
        path: 'vehicle-services', canActivate: [AuthGuard],
        children: [
          { path: '', component: VehicleServicesComponent },
          { path: 'vehicle-register',
            loadChildren: () => import('./vehicle-services/vehicle.routes').then(m => m.vehicle)
          },
          { path: 'fancy-number', component: FancyNumberComponent },
          { path: 'national-permit', component: NationalPermitComponent },
          {
            path: 'vehicle-other-service',
            component: VehicleOtherServiceComponent,
          },
        ],
      },
      {
        path: 'manufacturer-services',canActivate: [AuthGuard],
        component: ManufacturerServicesComponent,
      },
      {
        path: 'informational-services',canActivate: [AuthGuard],
        loadChildren: () =>
          import('./informational-services/informational-routes').then((m) => m.informational),
      },
      { path: 'dashboard',canActivate: [AuthGuard], component: DashboardComponent },
    ],
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];
