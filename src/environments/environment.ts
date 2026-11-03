// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlServer: 'http://192.168.1.94:3000/api/v2',
  urlServerImages: 'http://192.168.1.94:3000/images',
  stripe: {
    publishKey: 'tu-api-key-de-stripe',
    secretKey: 'tu-api-secret-key-de-stripe',
    customerId: 'cus_O5Y3BpUU9oSHa3'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
