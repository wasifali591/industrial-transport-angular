import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../shared/helpers/must-match.validator';
import { MustSelect } from '../shared/helpers/select-type.validator';

// import custom password pattern
import { AppSettings } from '../../environments/environment';

import { routerTransition } from '../router.animations';
import { UserserviceService } from '../shared/services/userservice.service';
import { RegisterData } from '../shared/models/data';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    submitted = false;
    data: RegisterData;
    error = '';
    loading = false;
    returnUrl: string;

    userType: string[] = ['--Select User Type--', 'Vehicle Owner/Client', 'Vehicle Borrower/Customer'];

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserserviceService,
        private authenticationService: AuthenticationService,
        public router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.signupForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8),
                Validators.pattern(AppSettings.pattern)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8),
                Validators.pattern(AppSettings.pattern)]],
            userType: ['']
        }, {
            validator: [MustMatch('password', 'confirmPassword'), MustSelect('userType')]
        });
    }

    get fetchValue() {
        return this.signupForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.signupForm.invalid) {
            return;
        }
        this.insertRecord(this.signupForm);
    }
    insertRecord(signupForm) {
        this.userService.registerUser(signupForm.value).subscribe( res => {
            this.loginUser();
            // this.resetForm();
        },
        error => {
            this.error = error;
        });
    }

    resetForm() {
        this.signupForm.reset();
    }

    loginUser() {
        console.log(this.fetchValue.email.value, this.fetchValue.password.value);
        this.authenticationService.login(this.fetchValue.email.value, this.fetchValue.password.value)
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
}
