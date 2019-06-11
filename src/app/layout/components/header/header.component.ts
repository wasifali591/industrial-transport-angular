import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService } from '../../../shared/services/authentication.service';
import { UserserviceService } from 'src/app/shared/services/userservice.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    UserName = '';

    constructor(public router: Router, private authenticationService: AuthenticationService, private userService: UserserviceService) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.userInformation();
        this.pushRightClass = 'push-right';
    }
    userInformation() {
        this.userService.fetchUserInformation().subscribe((data: any) => {
        this.UserName = data.Information.UserFirstName_xt + ' ' + data.Information.UserLastName_xt;
        });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/homepage']);
    }
}
