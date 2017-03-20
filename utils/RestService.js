"use strict";
import $ from 'jquery';
import AuthService from './AuthService';
const BACKEND = window.ENV.BACKEND_URL;


function post(url, data) {
    // Prepare for `fetch` to replace jQuery:
    // let config = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    // };
    return $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer '+ AuthService.getToken(),
        },
        error: (jqXHR, textStatus, error) => {
            // `jqXHR` is a kind of Future or the response, with other methods and attributes.
            // `textStatus` can be "timeout", "error", "abort", or "parsererror".
            // `error` is the textual portion of the HTTP status, such as "Not Found" or "Internal Server Error".
            console.log(error + ": " + jqXHR.responseText);
        }
    });
}


function get(url) {
    return $.ajax({
        type: "GET",
        url: url,
        headers: {
            'Authorization': 'Bearer '+ AuthService.getToken(),
        },
        error: (jqXHR, textStatus, error) => {
            console.log(error + ": " + jqXHR.responseText);
        }
    }); 
}


class RestService {
    constructor() {
        this.insert = this.insert.bind(this);
        this.queryProjects = this.queryProjects.bind(this);
    }

    /* Select options list */

    getOptionsList(tableName) {
        let url = `${BACKEND}/table/${tableName}/list`;
        return get(url);
    }
    getConditionalOptionsList(tableName, suffix) {
        let url = `${BACKEND}/table/${tableName}/list/${suffix}`;
        return get(url);
    }
    getSecondaryOptionsList(tableName, id) {
        let url = `${BACKEND}/table/${tableName}/secondaryList/${id}`;
        return get(url);
    }

    /* Table data */

    specialSelect(tableName, activeOnly) {
        let url = `${BACKEND}/table/${tableName}/select`;
        if (activeOnly) {
            url += "?active=true";
        }
        return get(url);
    }

    /* Inserts */

    insert(tableName, formData) {
        let url = `${BACKEND}/table/${tableName}/insert`;
        console.info(url);
        return post(url, formData);
    }

    /* Find a row details by ID */

    findById(tableName, id) {
        let url = `${BACKEND}/table/${tableName}/find/${id}`;
        console.info(url);
        return get(url);
    }

    /* Query projects */

    queryProjects(ids, queryType) {
        let url = `${BACKEND}/query/projects/${queryType}/${ids.join(",")}`;
        return get(url);
    }
    searchSamplesByTerm(term) {
        let url = `${BACKEND}/search/samples?term=${term}`;
        return get(url);
    }

    /* Login */

    login(creds) {
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({
                username: creds.username,
                password: creds.password,
            }),
        };
        return fetch(window.ENV.BACKEND_URL + '/account/login', config);
    }

    signup(creds) {
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify(creds),
        };
        return fetch(window.ENV.BACKEND_URL + '/account/signup', config);
    }

    requestResetPassword(email) {
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({email, redirectUrl: window.location.host + '/changePassword'}),
        };
        return fetch(window.ENV.BACKEND_URL + '/account/requestResetPassword', config);
    }

    changePassword(code, email, newPassword) {
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({email, code, newPassword}),
        };
        return fetch(window.ENV.BACKEND_URL + '/account/changePassword', config);
    }

}



export default new RestService;
