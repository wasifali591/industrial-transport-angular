import { Component, OnInit, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType  } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { routerTransition } from '../../router.animations';
import { UserserviceService } from '../../shared/services/userservice.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormCanDeactivate } from '../../shared/formGuard/form-can-deactivate';
import { AppSettings } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [routerTransition()]
})
export class ProfileComponent extends FormCanDeactivate implements OnInit {
  verified = true;
  UserName = '';
  UserEmail = '';
  submitted = false;
  error = '';
  @ViewChild('form')
  profileForm: FormGroup;
  selectedFile: File;
  url = '';
  uploadData: FormData;
  uploadPercent = 0;
  _loading = true;

  constructor(private formBuilder: FormBuilder, private userService: UserserviceService,
    private authService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.getImage();
    this.userInformation();
  }
  get fetchValue() {
    return this.profileForm.controls;
  }

  // File gets uploaded on change event
  onFileChangeUpload(event) {

    this.selectedFile = <File>event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line: no-shadowed-variable
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };

    this.uploadData = new FormData();
    this.uploadData.append('document', this.selectedFile, this.selectedFile.name);
    this.uploadData.append('documentType', 'ProfilePic');
    this.userService.fileUpload(this.uploadData).subscribe( upload => {
      if (upload.type === HttpEventType.UploadProgress) {
        this.uploadPercent = Math.round(upload.loaded / upload.total * 100);
        console.log('Upload Progress:' + this.uploadPercent + '%' );
      } else if (upload.type === HttpEventType.Response) {
        console.log(upload);
      }
    },
    error => {
      console.log(error);
    });

  }

  getImage() {
    this.userService.fileView().subscribe((data: any) => {
      this.url = AppSettings.imageUrl + data.document;
    });
  }
  userInformation() {
    this.userService.fetchUserInformation().subscribe((data: any) => {
    this.UserName = data.Information.UserFirstName_xt + ' ' + data.Information.UserLastName_xt;
    this.UserEmail = data.Information.Email_xt;
    this._loading = false;
    });
  }

}
