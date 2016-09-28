
import $ from 'jquery';


class RestService {

    insert(table, fields, values) {
        let url = window.ENV.BACKEND_URL + "/table/"+table+"/insert/" + fields.join(",") +"/"+ values.join(",");
        return $.get(url);
    }

}


export default new RestService;
