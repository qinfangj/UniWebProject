import { isTokenExpired } from './jwtHelper';
import { browserHistory } from 'react-router';

/**
 * Source: https://github.com/auth0-samples/auth0-react-sample/blob/master/01-Login/src/utils/AuthService.js
 */


class AuthService {
    constructor() {
        this.login = this.login.bind(this);
    }

    _doAuthentication(authResult){
        // Save the user token
        this.setToken(authResult.idToken);
        // Navigate to the home route
        browserHistory.replace('/home');
        // Async loads the user profile data
        //...
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
        //this.emit('profile_updated', profile);
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


export default new AuthService();
