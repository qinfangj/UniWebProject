
import $ from 'jquery';
const BACKEND = window.ENV.BACKEND_URL;


class RestService {

    getLabsList() {
        let url = BACKEND + "/table/people/labsList";
        return $.get(url);
    }

    getProjectStatesList() {
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
