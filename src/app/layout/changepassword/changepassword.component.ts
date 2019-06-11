import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserserviceService } from '../../shared/services/userservice.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../shared/helpers/must-match.validator';

// import custom password pattern
import { AppSettings } from '../../../environments/environment';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;
  error = '';
  success = [];

  constructor(private formBuilder: FormBuilder,
    private userService: UserserviceService,
    private authenticationService: AuthenticationService,
    public router: Router) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8),
                         Validators.pattern(AppSettings.pattern)]],
      confirmNewPassword:  ['', [Validators.required, Validators.minLength(8),
                                 Validators.pattern(AppSettings.pattern)]]
  },
  {
    validator: MustMatch('newPassword', 'confirmNewPassword')
  });
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }
    this.userService.changePassword(this.changePasswordForm.value).subscribe( data => {
      console.log(data);
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    },
    error => {
        this.error = error;
    });
  }

}
