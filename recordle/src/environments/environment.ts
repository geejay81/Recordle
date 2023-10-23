// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  goLiveDate: '2022-05-22',
  baseUrl: 'http://localhost:4200/',
  dataUrl: "https://v6qz2c5y.apicdn.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22album%22%5D%7B%0A%20%20'id'%3A%20gameId%2C%0A%20%20artist%2C%0A%20%20albumTitle%2C%0A%20%20embedKey%2C%0A%20%20'coverArt'%3A%20coverArt.asset-%3Eurl%0A%7D"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
