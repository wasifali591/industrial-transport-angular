import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { routerTransition } from '../../router.animations';
import { MustSelectTruck } from '../../shared/helpers/select-type.validator';
import { UserserviceService } from '../../shared/services/userservice.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./truck.component.scss'],
  animations: [routerTransition()]
})
export class TruckComponent implements OnInit {
  truckForm: FormGroup;
  truckCount = 0;
  page = 1;
  size = 10;
  truckFoundError = false;
  closeResult: string;
  _loading = true;

  truckTypeList = ['--Select Truck Type--', 'Light Weight Truck', 'Medium Weight Truck', 'Heavy Weight Truck'];
  truckDetails = [];


  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private userService: UserserviceService) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.truckForm = this.formBuilder.group({
      truckType: ['', Validators.required],
      truckManufacturedDate: ['', Validators.required],
      licensePlateNumber: ['', Validators.required],
      registrationCertificate: [null, Validators.required],
      insuranceDocument: [null, Validators.required],
      pollutionDocument: [null, Validators.required]
    },
    {
      validators:  MustSelectTruck('truckType')
    });
    this.fetchTrucks();
  }

  get fetchValue() {
    return this.truckForm.controls;
  }

  onSubmit() {
    if (this.truckForm.invalid) {
      return;
    }
    const payload = Object.assign({}, this.truckForm.value);
    payload.truckManufacturedDate = this.truckForm.value.truckManufacturedDate.month +
    '/' + this.truckForm.value.truckManufacturedDate.day + '/' + this.truckForm.value.truckManufacturedDate.year;
    this.userService.truckProfile(payload).subscribe((data: any) => {
      alert(data.message);
      this.fetchTrucks();
      this.modalService.dismissAll();
    },
    error => {
      alert(error);
    });
  }

  resetForm() {
    this.truckForm.reset();
  }

  fetchTrucks() {
    this.userService.fetchTrucks().subscribe((data: any) => {
      if (data.error === true) {
        this.truckFoundError = true;
      } else {
        this.truckDetails = data.trucks;
        this.truckFoundError = false;
        this.truckCount = this.truckDetails.length;
      }
      this._loading = false;
    },
    error => {
      alert(error);
      this._loading = false;
    });
  }

  openTruckDetailsModal(content) {
    this.modalService.open(content, {centered: true, size: 'lg', backdropClass: 'light-blue-backdrop' });
  }
  openRegistrationModal(registration) {
    this.modalService.open(registration, {centered: true, size: 'lg', backdropClass: 'light-blue-backdrop' });
  }

}
