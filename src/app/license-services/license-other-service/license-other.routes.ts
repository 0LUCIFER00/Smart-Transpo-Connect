import { Routes } from '@angular/router';
import { LicenseOtherServiceComponent } from './license-other-service.component';
import { DlRenewalComponent } from './dl-renewal/dl-renewal.component';
import { DlDuplicateComponent } from './dl-duplicate/dl-duplicate.component';
import { LlChangesComponent } from './ll-changes/ll-changes.component';
import { DlChangesComponent } from './dl-changes/dl-changes.component';
import { AddClassComponent } from './add-class/add-class.component';
import { IdPermitComponent } from './id-permit/id-permit.component';
import { SurrenderClassComponent } from './surrender-class/surrender-class.component';
import { EndorsementComponent } from './endorsement/endorsement.component';
import { IssueBadgeComponent } from './issue-badge/issue-badge.component';
import { DlextractRequestComponent } from './dlextract-request/dlextract-request.component';
import { LlRetestComponent } from './ll-retest/ll-retest.component';
import { ReallocateSlotComponent } from './reallocate-slot/reallocate-slot.component';
import { CancelDlComponent } from './cancel-dl/cancel-dl.component';
import { LlTutorialComponent } from './ll-tutorial/ll-tutorial.component';
import { DlTutorialComponent } from './dl-tutorial/dl-tutorial.component';
import { CompletePendingComponent } from './complete-pending/complete-pending.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';

export const license_others: Routes = [
  { 
      path: '',
      children: [
        { path: '', component: LicenseOtherServiceComponent},
        { path: 'dl-renewal', component: DlRenewalComponent},
        { path: 'dl-duplicate', component: DlDuplicateComponent},
        { path: 'll-changes', component: LlChangesComponent},
        { path: 'dl-changes', component: DlChangesComponent},
        { path: 'add-class', component: AddClassComponent},
        { path: 'id-permit', component: IdPermitComponent},
        { path: 'surrender-class', component: SurrenderClassComponent},
        { path: 'endorsement', component: EndorsementComponent},
        { path: 'issue-badge', component: IssueBadgeComponent},
        { path: 'dlextract-request', component: DlextractRequestComponent},
        { path: 'll-retest', component: LlRetestComponent},
        { path: 'reallocate-slot', component: ReallocateSlotComponent},
        { path: 'cancel-dl', component: CancelDlComponent},
        { path: 'll-tutorial', component: LlTutorialComponent},
        { path: 'dl-tutorial', component: DlTutorialComponent},
        { path: 'complete-pending', component: CompletePendingComponent},
        { path: 'upload-doc', component: UploadDocComponent},
  ]}
];