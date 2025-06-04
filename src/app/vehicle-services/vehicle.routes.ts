import { Routes } from '@angular/router';
import { VehicleServicesComponent } from './vehicle-services.component';
import { VehicleRegisterComponent } from './vehicle-register/vehicle-register.component';
import { FancyNumberComponent } from './fancy-number/fancy-number.component';
import { NationalPermitComponent } from './national-permit/national-permit.component';
import { VehicleOtherServiceComponent } from './vehicle-other-service/vehicle-other-service.component';
import { NewRegistrationComponent } from './vehicle-register/new-registration/new-registration.component';
import { TempToPermComponent } from './vehicle-register/temp-to-perm/temp-to-perm.component';
import { RcRenewalComponent } from './vehicle-register/rc-renewal/rc-renewal.component';
import { DuplicateRcComponent } from './vehicle-register/duplicate-rc/duplicate-rc.component';
import { OwnershipTransferComponent } from './vehicle-register/ownership-transfer/ownership-transfer.component';
import { AddressChangeComponent } from './vehicle-register/address-change/address-change.component';
import { ReCorrectionComponent } from './vehicle-register/re-correction/re-correction.component';
import { NocComponent } from './vehicle-register/noc/noc.component';
import { ReRegistrationComponent } from './vehicle-register/re-registration/re-registration.component';
import { ScrappingComponent } from './vehicle-register/scrapping/scrapping.component';

export const vehicle: Routes = [
  {
    path: '',
    children: [
      { path: '', component: VehicleRegisterComponent },
      { path: 'new-registration', component: NewRegistrationComponent },
      { path: 'temp-to-perm', component: TempToPermComponent },
      { path: 'rc-renewal', component: RcRenewalComponent },
      { path: 'duplicate-rc', component: DuplicateRcComponent },
      { path: 'ownership-transfer', component: OwnershipTransferComponent },
      { path: 'address-change', component: AddressChangeComponent },
      { path: 'rc-correction', component: ReCorrectionComponent },
      { path: 'noc', component: NocComponent },
      { path: 're-registration', component: ReRegistrationComponent },
      { path: 'scrapping', component: ScrappingComponent },
    ],
  },
];
