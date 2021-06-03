// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const rootUrl = 'http://13.127.179.148:8085';

export const environment = {
  production: false,
  loginUrl: `${rootUrl}/api/login`,
  getEvent: `${rootUrl}/api/events/`,
  createEvent: `${rootUrl}/api/events/updateEvent`,
  deleteEvent: `${rootUrl}/api/events/delete`,
  updateEvent: `${rootUrl}/api/eventupdate`,
  suggestion: `${rootUrl}/api/suggestions`,
  secret: 'kewnhdlqwkejrhlnwkjfhsdkdjfgls',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
