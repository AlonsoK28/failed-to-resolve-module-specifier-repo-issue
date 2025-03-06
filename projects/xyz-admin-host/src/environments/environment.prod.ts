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
  production: true,
  priceMaxAmount: 459999, // max price $459,999.00
  supportedLenguages: ['en', 'es'],
  snackbarDefaultTimeoutSeconds: 5, //duration in seconds
  snackbarOnErrorTimeoutSeconds: 15, //duration in seconds
  snackbarImportantMessageTimeoutSeconds: 33, //duration in seconds
};
