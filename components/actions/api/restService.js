
import $ from 'jquery';
const BACKEND = window.ENV.BACKEND_URL;


class RestService {

    insert(table, fields, values) {
        let url = BACKEND + "/table/"+table+"/insert/" + fields.join(",") +"/"+ values.join(",");
        return $.get(url);
    }

}


export default new RestService;
