import { isTokenExpired } from './jwtHelper';
import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';

/**
 * Source: https://github.com/auth0-samples/auth0-react-sample/blob/master/01-Login/src/utils/AuthService.js
 */


export default class AuthService {
    constructor(clientId, domain) {
        super();
        // Configure Auth0
        this.lock = new Auth0Lock(clientId, domain, {
            auth: {
                redirectUrl: `${window.location.origin}/login`,
                responseType: 'token'
            }
        });
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this._doAuthentication.bind(this));
        // Add callback for lock `authorization_error` event
        this.lock.on('authorization_error', this._authorizationError.bind(this));
        // binds login functions to keep this context
        this.login = this.login.bind(this);
    }

    _doAuthentication(authResult){
        // Save the user token
        this.setToken(authResult.idToken);
        // Navigate to the home route
        browserHistory.replace('/home');
        // Async loads the user profile data
        this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error);
            } else {
                this.setProfile(profile);
            }
        })
    }

    /**
     * Unexpected authentication error
     */
    _authorizationError(error) {
        console.log('Authentication Error', error);
    }

    /**
     * Call the show method to display the widget.
     */
    login() {
        this.lock.show()
    }

    /**
     * Checks if there is a saved token and it's still valid
     */
    loggedIn() {
        const token = this.getToken();
        return !!token && !isTokenExpired(token);
    }

    /**
     * Saves profile data to localStorage
     */
    setProfile(profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
        // Triggers profile_updated event to update the UI
        this.emit('profile_updated', profile);
    }

    /**
     * Retrieves the profile data from localStorage
     */
    getProfile() {
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {};
    }

    /**
     * Saves user token to localStorage
     */
    setToken(idToken) {
        localStorage.setItem('id_token', idToken);
    }

    /**
     * Retrieves the user token from localStorage
     */
    getToken() {
        return localStorage.getItem('id_token');
    }

    /**
     * Clear user token and profile data from localStorage
     */
    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }
}
