"use strict";
import $ from 'jquery';
import AuthService from './AuthService';
const BACKEND = window.ENV.BACKEND_URL;
import * as feedback from '../utils/feedback';


/**
 *
 * @param jqXHR: jQuery XHR response object.
 * @param textStatus:
 * @param error: (string)
 */
function handleError(jqXHR, statusText, error)  {
    let msg = jqXHR.responseText;
    if (jqXHR.status === 0) {
        msg = "Server error";
        feedback.error(msg, {}, "RestService::handleError");
    } else if (jqXHR.status === 404) {
        msg = "Page not found";
        feedback.error(msg, {}, "RestService::handleError");
    } else if (jqXHR.status === 401) {
        msg = "Unauthorized";
        feedback.error(msg, {}, "RestService::handleError");
        AuthService.logout();
    }
    console.log(error, statusText, jqXHR);
    feedback.error(msg, {}, "RestService::handleError");
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

    batchInsert(tableName, formData) {
        let url = `${BACKEND}/user/batch/${tableName}`;
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

    /* Query projects/runs */

    queryProjects(ids, queryType) {
        if (ids === "") {
            throw "Empty ids list passed to queryProjects";
        }
        let url = `${BACKEND}/query/projects/${queryType}/${ids}`;
        console.info(url);
        return get(url);
    }

    queryRuns(ids, queryType) {
        if (ids === "") {
            throw "Empty ids list passed to queryRuns";
        }
        let url = `${BACKEND}/query/runs/${queryType}/${ids}`;
        console.info(url);
        return get(url);
    }

    /* Tracking for Samples */

    trackingSummaries(trackType) {

        let url = `${BACKEND}/tracking/${trackType}`;
        console.info(url);
        return get(url);
    }

    searchSamplesByTerm(term) {
        let url = `${BACKEND}/search/samples?term=${term}`;
        return get(url);
    }

    /* UserData for runs */

    getUserRunsData(dataType) {
        //dataType: "dataLabs" or "dataCollabs"
        let url = `${BACKEND}/user/data/${dataType}`;
        console.info(url);
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

    refresh() {
        let config = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer '+ AuthService.getToken() },
        };
        return fetch(window.ENV.BACKEND_URL + '/account/refresh', config);
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

    validateUser(user) {
        //let url = `${BACKEND}/table/users/validate/${id}`;
        let url = window.ENV.BACKEND_URL + '/account/activateUser';
        console.info(url);
        return post(url, user);
    }

    /* Static files (pdf, qc/ivc, etc,) */

    bioanalyserPdf(id) {
        let url = `${BACKEND}/pdf/bioanalyser/${id}`;
        console.info(url);
        return $.ajax({
            type: "GET",
            url: url,
            headers: {
                'Authorization': 'Bearer '+ AuthService.getToken(),
            },
            error: handleError,
            // dataType : 'text',
            // contentType : 'application/pdf',
        });

        // let xhr = new XMLHttpRequest();
        // xhr.open('GET', url, true);
        // xhr.responseType = 'blob';
        // xhr.setRequestHeader('Authorization', 'Bearer '+ AuthService.getToken());
        // xhr.onload = function(e) {
        //     // preloader.modal('hide');
        //     if (this.status == 200) {
        //         console.log(111, e, this.response)
        //         // var blob = new Blob([this.response], {type: 'application/pdf'});
        //         // var downloadUrl = window.URL.createObjectURL(blob);
        //         return this.response;
        //         // var a = document.createElement("a");
        //         // a.href = downloadUrl;
        //         // a.download = "data.xls";
        //         // document.body.appendChild(a);
        //         // a.click();
        //     } else {
        //         alert('Unable to download excel.')
        //     }
        // };
        // xhr.send();
    }

}



export default new RestService;
