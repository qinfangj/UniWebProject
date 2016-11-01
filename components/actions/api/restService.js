import $ from 'jquery';
const BACKEND = window.ENV.BACKEND_URL;


class RestService {

    /* Select options list */

    getLabs() {
        let url = BACKEND + "/table/people/labsList";
        return $.get(url);
    }

    getProjectStates() {
        let url = BACKEND + "/table/project_states/projectStatesList";
        return $.get(url);
    }

    /* Table data */

    specialSelect(tableName, activeOnly) {
        let mode = activeOnly ? "selactive" : "selall";
        let url = BACKEND + "/table/"+ tableName +"/"+ mode;
        return $.get(url);
    }

    /* Inserts */

    insert(table, formData) {
        let url = BACKEND + "/table/"+table+"/insert";
        console.info(url);
        //console.debug(fields)
        //console.debug(values)
        //console.debug(url)
        return $.post(url, formData);
    }

}


export default new RestService;
