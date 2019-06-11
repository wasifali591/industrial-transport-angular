import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType  } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';

import { AppSettings } from '../../../environments/environment';
import { RegisterData, ChangePasswordData, UpdateProfileData, FileData } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  // Register User
  registerUser(registerData: RegisterData) {
    return this.http.post(AppSettings.Url + '/register', registerData);
  }

  changePassword(changeData: ChangePasswordData) {
    return this.http.post(AppSettings.privateUrl + '/change-password', changeData);
  }

  updateProfile(updateData: UpdateProfileData) {
    return this.http.post(AppSettings.privateUrl + '/update-user-information', updateData);
  }

  fileUpload(File) {
    return this.http.post(AppSettings.privateUrl + '/upload-document/ProfilePic', File, {
    // return this.http.post('http://localhost/SlimTruckage/public/api/image', File, {
      reportProgress: true,
      observe: 'events'
    });
  }

  truckProfile(truckData: any) {
    return this.http.post(AppSettings.privateUrl + '/update-truck-information', truckData);
  }


  fileView() {
    return this.http.get<any>(AppSettings.privateUrl + '/view-document/ProfilePic');
    // return this.http.get('http://localhost/SlimTruckage/public/api/image/fetch');
  }

  fetchUserInformation() {
    return this.http.get<any>(AppSettings.privateUrl + '/view-user-information');
  }

  fetchTrucks() {
    return this.http.get<any>(AppSettings.privateUrl + '/fetch-truck-information');
  }

  fetchDrivers() {
    return this.http.get<any>(AppSettings.privateUrl + '/fetch-driver-information');
  }
}
