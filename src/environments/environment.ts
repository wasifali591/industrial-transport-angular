// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export class AppSettings {
  // public static Url = 'http://localhost:8080/SlimTruckage/public/api';
  // public static privateUrl = 'http://localhost:8080/industrial-transportation-slim/public//private/v1';
  // public static imageUrl = 'http://localhost:8080/';
  public static Url = 'http://localhost:80/industrial-transportation-slim/public/public/v1';
  public static privateUrl = 'http://localhost:80/industrial-transportation-slim/public/private/v1';
  public static imageUrl = 'http://localhost:80/';
  public static pattern = /^(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%])[0-9A-Za-z!@#$%]{8,}$/;
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
