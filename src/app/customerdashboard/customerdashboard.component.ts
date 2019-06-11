import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/services/authentication.service';
import { UserserviceService } from '../shared/services/userservice.service';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.scss']
})
export class CustomerdashboardComponent implements OnInit {

  UserName = '';
  UserEmail = '';


  constructor(
    public router: Router,
    private _authenticationService: AuthenticationService,
    private _userService: UserserviceService
  ) { }

  ngOnInit() {
    this.userInformation();
  }

  logout() {
    this._authenticationService.logout();
    this.router.navigate(['/homepage']);
  }

  userInformation() {
    this._userService.fetchUserInformation().subscribe((data: any) => {
    this.UserName = data.Information.UserFirstName_xt + ' ' + data.Information.UserLastName_xt;
    this.UserEmail = data.Information.Email_xt;
    });
  }

}
