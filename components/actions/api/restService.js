
import $ from 'jquery';
const BACKEND = window.ENV.BACKEND_URL;


class RestService {

    getLabs() {
        let url = BACKEND + "/table/people/labsList";
        return $.get(url);
    }

    getProjects(activeOnly) {
        let mode = activeOnly ? "selactive" : "selall";
        let url = BACKEND + "/table/projects/" + mode;
        return $.get(url);
    }

    getActiveProjects() {
        let url = BACKEND + "/table/projects/selactive";
        return $.get(url);
    }

    getProjectStates() {
        let url = BACKEND + "/table/people/projectStatesList";
        return $.get(url);
    }

    selectAll(table, fields) {
        let url = BACKEND + "/table/"+table+"/selall/" + fields.join(",");
        return $.get(url);
    }

    insert(table, fields, values) {
        let url = BACKEND + "/table/"+table+"/insert/" + fields.join(",") +"/"+ values.join(",");
        //console.debug(fields)
        //console.debug(values)
        //console.debug(url)
        return $.get(url);
    }

}


export default new RestService;
