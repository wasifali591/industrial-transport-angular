import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerdashboardComponent } from './customerdashboard.component';

const routes: Routes = [
 {
    path: '',
    component: CustomerdashboardComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerdashboardRoutingModule { }
