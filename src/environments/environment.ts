/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC4eJPxCtA3C6ZhXcHaPKVG4ZJEO3g9RKc",
    authDomain: "saharga-app.firebaseapp.com",
    databaseURL: "https://saharga-app.firebaseio.com",
    projectId: "saharga-app",
    storageBucket: "saharga-app.appspot.com",
    messagingSenderId: "46125417361",
    appId: "1:46125417361:web:87d6910dad33da7fe15030"
  }
};
