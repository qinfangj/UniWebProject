/**
 * Created by christine on 28.02.17.
 */
import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

chai.config.includeStack = true;


if (typeof document === 'undefined') {
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.window = document.defaultView;
    global.window.ENV = {BACKEND_URL: 'asdf'};
    //window.ENV.BACKEND_URL = 'asdf';
    global.navigator = global.window.navigator;
    global.HTMLElement = global.window.HTMLElement;
    global.HTMLInputElement = global.window.HTMLInputElement;
    global.HTMLSelectElement = global.window.HTMLSelectElement;
    global.HTMLButtonElement = global.window.HTMLButtonElement;
}

chai.use(chaiImmutable);