import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustSelectGender, MustSelectId } from '../../../shared/helpers/select-type.validator';
import { UserserviceService } from '../../../shared/services/userservice.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss']
})
export class UpdateprofileComponent implements OnInit {
  profileForm: FormGroup;
  error = '';
  uploadData: FormData;
  uploadPercent = 0;
  selectedFile: File;
  lock = false;
  date: {year: number, month: number, day: number};

  Gender: string[] = ['--Select Gender--', 'Male', 'Female'];

  idType: string[] = ['--Select Id Type--', 'Aadhar Card', 'Voter Card', 'PAN Card', 'Passport'];

  constructor(private formBuilder: FormBuilder,
    private userService: UserserviceService
    ) { }

  ngOnInit() {
    this.userInformation();
    this.profileForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      idType: ['', Validators.required],
      idNumber: ['', Validators.required],
      // document: [null, Validators.required],
      locality: ['', Validators.required],
      landmark: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required]
    },
    {
      validators: [MustSelectGender('gender'), MustSelectId('idType')]
    });
  }

  get fetchValue() {
    return this.profileForm.controls;
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }
    const payload = Object.assign({}, this.profileForm.value);
    payload.dob = this.profileForm.value.dob.month + '/' + this.profileForm.value.dob.day + '/' + this.profileForm.value.dob.year;
    this.userService.updateProfile(payload).subscribe( (res: any) => {
      window.alert(res.message);
      location.reload();
    },
    error => {
        console.log(error);
        this.error = error;
        // window.alert(this.error);
        // location.reload();
    });
  }

  // Upload file and send it to backend
  onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
    this.uploadData = new FormData();
    this.uploadData.append('document', this.selectedFile, this.selectedFile.name);
    this.uploadData.append('documentType', 'AadharCard');
    console.log(this.uploadData.has('document'));
    this.userService.fileUpload(this.uploadData).subscribe( res => {
      console.log(res); // handle event here
    },
    error => {
      console.log(error);
    });
  }

  userInformation() {
    this.userService.fetchUserInformation().subscribe((data: any) => {
    this.lock = !this.lock;
    this.profileForm.patchValue({
      // companyName: data.Information.Email_xt,
      gender: data.Information.Gender_xt,
      dob: {year: Number(data.Information.DateOfBirth_xd.substring(6, 10)), month: Number(data.Information.DateOfBirth_xd.substring(0, 2)),
        day: Number(data.Information.DateOfBirth_xd.substring(3, 5))},
      mobileNumber: data.Information.Mobile_xn,
      idType: data.Information.GovernmentIdType_xt,
      idNumber: data.Information.GovernmentIdNumber_xt,
      // document: data.Information,
      locality: data.Address.Locality_xt,
      landmark: data.Address.Landmark_xt,
      city: data.Address.City_xt,
      country: data.Address.Country_xt,
      postalCode: data.Address.Pincode_xn
    });
  },
  error => {
    this.lock = !this.lock;
    this.error = 'Error fetching data! Please try again later.';
  });
  }

  unlockForm() {
    this.lock = !this.lock;
  }
}
