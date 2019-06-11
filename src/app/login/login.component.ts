import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { routerTransition } from '../router.animations';
import { AuthenticationService } from '../shared/services/authentication.service';
import { RegisterData } from '../shared/models/data';
import { UserserviceService } from '../shared/services/userservice.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    currentUser: RegisterData;
    loading = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private _userService: UserserviceService ) {  }

    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            this.selectDashboard();
        }
        this.selectDashboard();
        this.loginForm = this.formBuilder.group({
            loginEmail: ['', [Validators.required, Validators.email]],
            loginPassword: ['', Validators.required]
        });
        // reset login status
        // this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // Get values entered in form
    get fetchValue() {
        return this.loginForm.controls;
    }
    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        this.authenticationService.login(this.fetchValue.loginEmail.value, this.fetchValue.loginPassword.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
        });

    }

    selectDashboard() {
        this._userService.fetchUserInformation().subscribe((data: any) => {
            if (data.Information.UserType_xt === 'Vehicle Owner/Client') {
                this.router.navigate(['/dashboard']);
            } else {
                this.router.navigate(['/customerdashboard']);
            }
        });
    }
}
