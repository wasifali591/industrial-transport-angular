import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CustomerdashboardRoutingModule } from './customerdashboard-routing.module';
import { CustomerdashboardComponent } from './customerdashboard.component';
import { ProfileModule } from '../layout/profile/profile.module';
import { CanDeactivateGuard } from '../shared/formGuard/can-deactivate.guard';

@NgModule({
  declarations: [CustomerdashboardComponent],
  imports: [
    CommonModule,
    CustomerdashboardRoutingModule,
    NgbModule,
    ProfileModule
  ],
  providers: [CanDeactivateGuard]
})
export class CustomerdashboardModule { }
