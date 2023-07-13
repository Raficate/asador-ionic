// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDgMalfsN-q1nS_JDHXKtAZaWBAgXM67go",
    authDomain: "asador-virgen-vinas.firebaseapp.com",
    projectId: "asador-virgen-vinas",
    storageBucket: "asador-virgen-vinas.appspot.com",
    messagingSenderId: "967491066783",
    appId: "1:967491066783:web:83496cac2a39c7f840fbaa"
  },
  precios: {
    pollo: 11,
    medio: 6,
    muslo: 3.5,
    patgr: 3.5,
    patmd: 2.5,
    patpq: 1.5,
    croq: 0.7,
    pim: 1.5,
    pimband: 2.5
  },
  title: "ASADOR DE POLLOS VIRGEN DE LAS VIÑAS"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
