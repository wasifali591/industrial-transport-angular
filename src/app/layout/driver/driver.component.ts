import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustSelectDriver } from '../../shared/helpers/select-type.validator';
import { UserserviceService } from 'src/app/shared/services/userservice.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./driver.component.scss'],
  animations: [routerTransition()]
})
export class DriverComponent implements OnInit {
  driverForm: FormGroup;
  submitted = false;
  driverCount = 0;
  page = 1;
  size = 10;
  closeResult: string;
  driverFoundError = false;
  _loading = true;

  driverType = ['--Select Driving License Type--', 'Commercial driving License', 'Non-Commercial driving License'];
  driverDetails = [ ];

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private userService: UserserviceService) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      driverName: ['', Validators.required],
      driverLicenseNumber: ['', Validators.required],
      driverLicenseType: ['', Validators.required],
      licenseIssuedDate: ['', Validators.required],
      licenseExpiryDate: ['', Validators.required],
      driverLicense: [null, Validators.required],
      driverInsurance: [null, Validators.required]
    },
    {
      validators: MustSelectDriver('driverLicenseType')
    });
    this.fetchDrivers();
  }

  get fetchValue() {
    return this.driverForm.controls;
  }

  resetForm() {
    this.driverForm.reset();
  }
  onSubmit() {
    if (this.driverForm.invalid) {
      return;
    }
    alert ('SUCCESS!!:-' + JSON.stringify(this.driverForm.value));
  }

  fetchDrivers() {
    this.userService.fetchDrivers().subscribe((data: any) => {
      if (data.error === true) {
        this.driverFoundError = true;
      } else {
        this.driverDetails = data.drivers;
        this.driverFoundError = false;
        this.driverCount = this.driverDetails.length;
      }
      this._loading = false;
    });
  }

  openDriverDetailsModal(content) {
    this.modalService.open(content, {centered: true, size: 'lg', backdropClass: 'light-blue-backdrop' });
  }

  openRegistrationModal(registration) {
    this.modalService.open(registration, {centered: true, size: 'lg', backdropClass: 'light-blue-backdrop' });
  }
}
