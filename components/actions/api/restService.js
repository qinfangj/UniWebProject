import $ from 'jquery';
const BACKEND = window.ENV.BACKEND_URL;


class RestService {
    constructor() {
        this.insert = this.insert.bind(this);
        this.queryProjects = this.queryProjects.bind(this);
    }

    post(url, data) {
        return $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            error: (jqXHR, textStatus, error) => {
                // `jqXHR` is a kind of Future or the response, with other methods and attributes.
                // `textStatus` can be "timeout", "error", "abort", or "parsererror".
                // `error` is the textual portion of the HTTP status, such as "Not Found" or "Internal Server Error".
                console.debug(error, ':', jqXHR.responseText);
            }
        });
    }

    /* Select options list */

    getOptionsList(tableName) {
        let url = `${BACKEND}/table/${tableName}/list`;
        return $.get(url);
    }
    getConditionalOptionsList(tableName, suffix) {
        let url = `${BACKEND}/table/${tableName}/list/${suffix}`;
        return $.get(url);
    }
    getSecondaryOptionsList(tableName, id) {
        let url = `${BACKEND}/table/${tableName}/secondaryList/${id}`;
        return $.get(url);
    }

    /* Table data */

    specialSelect(tableName, activeOnly) {
        let mode = activeOnly ? "selactive" : "selall";
        let url = `${BACKEND}/table/${tableName}/${mode}`;
        return $.get(url);
    }

    /* Inserts */

    insert(tableName, formData) {
        let url = `${BACKEND}/table/${tableName}/insert`;
        console.info(url);
        return this.post(url, formData);
    }

    /* Query projects */

    queryProjects(ids) {
        let url = `${BACKEND}/query/projects/${ids.join(",")}`;
        return $.get(url);
    }

}


export default new RestService;
