"use strict";
import $ from 'jquery';
import store from '../core/store';
import AuthService from './AuthService';
const BACKEND = window.ENV.BACKEND_URL;
import { feedbackSuccess, feedbackError, feedbackWarning } from '../components/actions/actionCreators/feedbackActionCreators';


/**
 *
 * @param jqXHR: jQuery XHR response object.
 * @param textStatus:
 * @param error: (string)
 */
function handleError(jqXHR, textStatus, error)  {
    let msg = error.statusText + ": " +jqXHR.responseText;
    if (jqXHR.status === 0) {
        msg = "Could not connect to server";
    }
    store.dispatch(feedbackError("REST", msg, error || {}));
}


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
        error: handleError,
    });
}


function get(url) {
    return $.ajax({
        type: "GET",
        url: url,
        headers: {
            'Authorization': 'Bearer '+ AuthService.getToken(),
        },
        error: handleError,
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
        if (!suffix || suffix === "") {
            throw "Cannot call getConditionalOptionsList without a suffix";
        }
        let url = `${BACKEND}/table/${tableName}/list/${suffix}`;
        return get(url);
    }
    getSecondaryOptionsList(tableName, id) {
        if (!id || id === "") {
            throw "Empty argument to getSecondaryOptionsList";
        }
        let url = `${BACKEND}/table/${tableName}/secondaryList/${id}`;
        return get(url);
    }

    /* Table data */

    specialSelect(tableName, activeOnly, limit, offset, orderBy, orderDir, filterBy) {
        let url = `${BACKEND}/table/${tableName}/select`;
        let options = [];
        if (activeOnly) {
            options.push("active=true");
        }
        if (limit !== undefined && limit !== null) {
            options.push("limit="+ limit);
        }
        if (offset !== undefined && offset !== null) {
            options.push("offset="+ offset);
            if (!limit) {
                throw "Cannot OFFSET without a LIMIT";
            }
        }
        if (orderBy) {
            options.push("orderBy="+ orderBy);
        }
        if (orderDir) {
            options.push("orderDir="+ orderDir);
        }
        if (filterBy) {
            options.push("filterBy="+ filterBy);
        }
        if (options.length > 0) {
            url += "?" + options.join("&");
        }
        return get(url);
    }

    /* Inserts */

    insert(tableName, formData) {
        let url = `${BACKEND}/table/${tableName}/insert`;
        console.info(url);
        return post(url, formData);
    }

    /* Delete */

    delete(tableName, id) {
        let url = `${BACKEND}/table/${tableName}/delete/${id}`;
        console.info(url);
        return post(url);
    }

    /* Find a row details by ID */

    findById(tableName, id) {
        if (!id || id === "") {
            throw "Empty argument to findById";
        }
        let url = `${BACKEND}/table/${tableName}/find/${id}`;
        console.info(url);
        return get(url);
    }

    librariesFromPool(projectId, poolId) {
        let url = `${BACKEND}/table/runs/pool/${projectId}/${poolId}`;
        console.info(url);
        return get(url);
    }

    /* Query projects */

    queryProjects(ids, queryType) {
        if (ids === "") {
            throw "Empty ids list passed to queryProjects";
        }
        let url = `${BACKEND}/query/projects/${queryType}/${ids}`;
        return get(url);
    }

    /* Tracking for Samples */

    trackingSummaries(trackType) {

        let url = `${BACKEND}/tracking/${trackType}`;
        console.log(url);
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
            body: JSON.stringify({email, redirectUrl: window.location.host + '/#/changePassword'}),
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

    getLoginDetails() {
        let url = `${BACKEND}/account/profile`;
        console.info(url);
        return get(url);
    }

    deleteUnvalidatedUsers() {
        let url = `${BACKEND}/account/deleteUnvalidated`;
        console.info(url);
        return post(url);
    }

    validateUser(id) {
        let url = `${BACKEND}/table/users/validate/${id}`;
        console.info(url);
        return post(url);
    }

    /* Static files (pdf, qc/ivc, etc,) */

    bioanalyserPdf(id) {
        let url = `${BACKEND}/pdf/bioanalyser/${id}`;
        console.info(url);
        return get(url);
    }

}



export default new RestService;
