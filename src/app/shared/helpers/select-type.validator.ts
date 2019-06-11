import { FormGroup } from '@angular/forms';

// Custom validator to check if User Type is selected during registration
export function MustSelect(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        if (control.errors && !control.errors.mustSelect) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value === '' || control.value === '--Select User Type--') {
            control.setErrors({ mustSelect: true });
        } else {
            control.setErrors(null);
        }
    };
}

// Custom validator to check if appropriate Truck Type is selected during registration
export function MustSelectTruck(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        if (control.errors && !control.errors.mustSelect) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on control if validation fails
        if (control.value === '' || control.value === '--Select Truck Type--') {
            control.setErrors({ mustSelect: true });
        } else {
            control.setErrors(null);
        }
    };
}

// Custom validator to check if appropriate Driver Type is selected during registration
export function MustSelectDriver(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        if (control.errors && !control.errors.mustSelectType) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on control if validation fails
        if (control.value === '' || control.value === '--Select Driving License Type--') {
            control.setErrors({ mustSelectType: true });
        } else if (control.value === 'Non-Commercial driving License') {
            control.setErrors({ invalidSelect: true});
        } else {
            control.setErrors(null);
        }
    };
}

// Custom validator to check if appropriate Driver Type is selected during registration
export function MustSelectGender(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        if (control.errors && !control.errors.mustSelectType) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on control if validation fails
        if (control.value === '' || control.value === '--Select Gender--') {
            control.setErrors({ mustSelectType: true });
        } else {
            control.setErrors(null);
        }
    };
}

// Custom validator to check if appropriate Driver Type is selected during registration
export function MustSelectId(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        if (control.errors && !control.errors.mustSelectType) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on control if validation fails
        if (control.value === '' || control.value === '--Select Id Type--') {
            control.setErrors({ mustSelectType: true });
        } else {
            control.setErrors(null);
        }
    };
}
