/**
 * Created by christine on 28.02.17.
 */
import jsdom from 'jsdom';

if (typeof document === 'undefined') {
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.window = document.defaultView;
    global.window.ENV = {BACKEND_URL: 'asdf'};
    //window.ENV.BACKEND_URL = 'asdf';
    global.navigator = global.window.navigator;


}
