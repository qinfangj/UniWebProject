"use strict";
import { isTokenExpired, getUserInfo } from './jwtHelper';
import { hashHistory } from 'react-router';

/**
 * Source: https://github.com/auth0-samples/auth0-react-sample/blob/master/01-Login/src/utils/AuthService.js
 */


class AuthService {
    constructor() {}

    _doAuthentication(authResult){
        this.setToken(authResult.access_token);
        hashHistory.replace('/home');
        // Async loads the user profile data
        //...
    }

    /**
     * Checks if there is a saved token and it's still valid
     */
    get isLoggedIn() {
        const token = this.getToken();
        return !!token && !isTokenExpired(token);
    }

    get isValidated() {
        return this.isLoggedIn && !!getUserInfo(this.getToken()).isvalidated;
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
}


export default new AuthService();
