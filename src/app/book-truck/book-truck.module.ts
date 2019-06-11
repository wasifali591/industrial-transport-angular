import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BookTruckRoutingModule } from './book-truck-routing.module';
import { BookTruckComponent } from './book-truck.component';

@NgModule({
  declarations: [BookTruckComponent],
  imports: [
    CommonModule,
    BookTruckRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: []
})
export class BookTruckModule { }
