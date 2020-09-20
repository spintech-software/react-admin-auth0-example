import authConfig from "./authConfig";
import {Auth0Client} from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
    domain: authConfig.domain,
    client_id: authConfig.clientID,
    cacheLocation: 'localstorage',
    useRefreshTokens: true
});

const CallbackURI = "http://localhost:3000/login"

export default {
    // called when the user attempts to log in
    login: (url) => {
        console.log("login")

        if (typeof url === 'undefined') {
            return auth0.loginWithRedirect({
                redirect_uri: CallbackURI
            })
        }
        return auth0.handleRedirectCallback(url.location);
    },
    // called when the user clicks on the logout button
    logout: () => {
        console.log("logout")
        return auth0.isAuthenticated().then(function (isAuthenticated) {
            if (isAuthenticated) { // need to check for this as react-admin calls logout in case checkAuth failed
                console.log("we was authenticated - logout from AUTH0 with redirect")
                return auth0.logout({
                    redirect_uri: window.location.origin,
                    federated: true // have to be enabled to invalidate refresh token
                });
            }
            console.log("we are logged out - just resolve")
            return Promise.resolve()
        })
    },
    // called when the API returns an error
    checkError: ({status}) => {
        console.log("checkError")
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        console.log("checkAuth")
        return auth0.isAuthenticated().then(function (isAuthenticated) {
            if (isAuthenticated) {
                console.log("token valid - we are authenticated")
                return Promise.resolve();
            }
            console.log("token invalid - run refresh token")

            return auth0.getTokenSilently({
                redirect_uri: CallbackURI
            })
                .then(function (token) {
                    if (token !== "") {
                        console.log("token refreshed")
                        return Promise.resolve()
                    }
                })
                .catch(function () {
                    console.log("token refresh failed")
                    return Promise.reject()
                })
        })
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        console.log("getPermissions")
        return Promise.resolve()
    },
};
