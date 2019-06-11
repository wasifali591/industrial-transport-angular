import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookTruckComponent } from './book-truck.component';

const routes: Routes = [
  {
    path: '',
    component: BookTruckComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookTruckRoutingModule { }
