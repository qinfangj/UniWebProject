import * as Toastr from 'toastr';
import '../styles/toastr.css';


Toastr.options.positionClass = "toast-top-center";
//Toastr.options.timeOut = "100000000";  // for testing
//Toastr.options.extendedTimeOut = "100000000000";  // for testing



export function reset() {
    Toastr.remove();
}

export function info(message, origin) {
    if (origin) {console.log("FEEDBACK_INFO from "+ origin);}
    Toastr.info(message);
}

export function success(message, origin) {
    if (origin) {console.log("FEEDBACK_SUCCESS from "+ origin);}
    Toastr.success(message);
}

export function warning(message, error, origin) {
    if (origin) {console.log("FEEDBACK_WARNING from "+ origin);}
    Toastr.warning(message);
}

export function error(message, error, origin) {
    if (origin) {console.log("FEEDBACK_ERROR from "+ origin);}
    // jQuery.ajax error
    if (error && error.statusText) {
        message = message + ` ${error.statusText} (${error.status}): ${error.responseText}`;
    } else if (message === "" && origin) {
        message = "Error from "+ origin;
    } else if (message === "") {
        message = "Uncaught error, sorry! Please report it explaining how it happened."
    }
    Toastr.error(message);
}
