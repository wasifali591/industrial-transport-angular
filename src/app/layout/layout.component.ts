import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserserviceService } from '../shared/services/userservice.service';
import { UpdateprofileComponent } from './profile/updateprofile/updateprofile.component';

@Component({
    providers: [ UpdateprofileComponent ],
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;
    _loading = false;

    constructor(
        public router: Router,
        private _userService: UserserviceService,
        private _updateProfile: UpdateprofileComponent
    ) {}

    ngOnInit() {
        // this.selectDashboard();
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }

    selectDashboard() {
        this._userService.fetchUserInformation().subscribe((data: any) => {
            if (data.Information.UserType_xt === 'Vehicle Owner/Client') {
                this.router.navigate(['/dashboard']);
            } else {
                this.router.navigate(['/customerdashboard']);
            }
        });
        this._loading = false;
    }
}
