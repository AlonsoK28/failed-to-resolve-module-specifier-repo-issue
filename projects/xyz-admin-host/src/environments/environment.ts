// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'admin-11',
    appId: '',
    storageBucket: '',
    apiKey: '',
    authDomain: '',
    messagingSenderId: '',
  },
  maxDaysSession: 3,
  localStorageSessionKey: 'xyz-admin-session',
  localStorageLenguageKey: 'xyz-admin-locale',
  localStorageDomainKey: 'xyz-admin-domain',
  localStorageSearchTerms: 'xyz-admin-search-terms',
  maxNumberOfSuggestedSearchTermsStored: 100,
  production: false,
  priceMaxAmount: 459999, // max price $459,999.00
  supportedLenguages: ['en', 'es'],
  snackbarDefaultTimeoutSeconds: 5, //duration in seconds
  snackbarOnErrorTimeoutSeconds: 15, //duration in seconds
  snackbarImportantMessageTimeoutSeconds: 33, //duration in seconds
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
