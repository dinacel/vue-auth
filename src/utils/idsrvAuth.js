import Vue from 'vue';
import { createOidcAuth, SignInType, LogLevel } from 'vue-oidc-client/vue2';
import { WebStorageStateStore } from 'oidc-client';

const loco = window.location;
const appRootUrl = `${loco.protocol}//${loco.host}${process.env.BASE_URL}`;

const idsrvAuth = createOidcAuth(
  'main',
  //SignInType.Popup,
  SignInType.Window,
  appRootUrl,
  {
    authority: 'https://connect.terreatlantique.com/',
    client_id: 'thermo_ta_test',
    response_type: 'code',
    scope: 'openid profile roles email api',
    // test use
    prompt: 'login',
    // UserManager use localStorage (default: sessionStorage)
    userStore: new WebStorageStateStore({
      store: window.localStorage
    })
  },
  console,
  LogLevel.Debug
);

// handle events
idsrvAuth.events.addAccessTokenExpiring(function() {
  // eslint-disable-next-line no-console
  console.log('[idsrv-auth] access token expiring');
});

idsrvAuth.events.addAccessTokenExpired(function() {
  // eslint-disable-next-line no-console
  console.log('[idsrv-auth] access token expired');
});

idsrvAuth.events.addSilentRenewError(function(err) {
  // eslint-disable-next-line no-console
  console.error('[idsrv-auth] silent renew error', err);
});

idsrvAuth.events.addUserLoaded(function(user) {
  // eslint-disable-next-line no-console
  console.log('[idsrv-auth] user loaded', user);
});

idsrvAuth.events.addUserUnloaded(function() {
  // eslint-disable-next-line no-console
  console.log('[idsrv-auth] user unloaded');
});

idsrvAuth.events.addUserSignedIn(function() {
  // eslint-disable-next-line no-console
  console.log('[idsrv-auth] user signed in');
});

idsrvAuth.events.addUserSignedOut(function() {
  // eslint-disable-next-line no-console
  console.log('[idsrv-auth] user signed out');
});

idsrvAuth.events.addUserSessionChanged(function() {
  // eslint-disable-next-line no-console
  console.log('[idsrv-auth] user session changed');
});

// promisify 'userLoaded' event
idsrvAuth.userLoaded = function() {
  return new Promise(function(resolve, reject) {
    // already authenticated
    if (idsrvAuth.isAuthenticated) {
      return resolve();
    }
    
    // wait user authentication
    idsrvAuth.events.addUserLoaded((user) => {
      return resolve();
    });
  });
};

// a little something extra
Vue.prototype.$oidc = idsrvAuth;

export default idsrvAuth;
