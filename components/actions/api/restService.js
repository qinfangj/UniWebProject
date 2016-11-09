import $ from 'jquery';
const BACKEND = window.ENV.BACKEND_URL;


class RestService {

    /* Select options list */

    getOptionsList(tableName, suffix) {
        let url = BACKEND + "/table/"+ tableName +"/"+ suffix;
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
            //success: callback,
            contentType: "application/json",
            dataType: "json"
        });
    }

}


export default new RestService;
