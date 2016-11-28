import $ from 'jquery';
const BACKEND = window.ENV.BACKEND_URL;


class RestService {

    /* Select options list */

    getOptionsList(tableName) {
        let url = BACKEND + "/table/"+ tableName +"/list";
        return $.get(url);
    }
    getSecondaryOptionsList(tableName, id) {
        let url = BACKEND + "/table/"+ tableName +"/secondaryList/" + id;
        return $.get(url);
    }

    /* Table data */

    specialSelect(tableName, activeOnly) {
        let mode = activeOnly ? "selactive" : "selall";
        let url = BACKEND + "/table/"+ tableName +"/"+ mode;
        return $.get(url);
    }

    /* Inserts */

    insert(tableName, formData) {
        let url = BACKEND + "/table/"+tableName+"/insert";
        console.info(url);
        return $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(formData),
            contentType: "application/json",
            dataType: "json"
        });
    }

}


export default new RestService;
