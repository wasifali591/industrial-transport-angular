export class RegisterData {
    id: number;
    name: string;
    email: string;
    password: string;
    confirmpassword?: string;
    token?: string;
}

export class ChangePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export class UpdateProfileData {
    companyName: string;
    // email: string;
    // firstName: string;
    // lastName:string;
    gender: string;
    dob: string;
    mobileNumber: string;
    idType: string;
    idNumber: string;
    // document: File | any;
    locality: string;
    landmark: string;
    city: string;
    country: string;
    postalCode: number;
}

export class FileData {
    file: File;
}
