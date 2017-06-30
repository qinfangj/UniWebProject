"use strict";
import React from 'react';

//import ReactTestUtils from 'react-addons-test-utils';

import { shallow, mount, render} from 'enzyme';
//import sinon from 'sinon';
import { expect, assert } from 'chai';

import store from '../core/store';
import tableNames from '../components/tables/tableNames';
import { Provider } from 'react-redux';
import { Button } from 'react-bootstrap';
import adminData from '../components/forms/adminData/adminDataModels';
import inputTypes from '../components/forms/inputTypes';
import CommonAdminForms from '../components/forms/adminData/CommonAdminForms';
import optionsStoreKeys from '../components/constants/optionsStoreKeys';

function makeUTforAdminForms(table, model, fieldsList){
    let form = mount(
        <Provider store={store}>
            <CommonAdminForms table={table}/>
        </Provider>
    );

    it('should initially be invalid', () => {
        assert.isFalse(store.getState().adminForms.forms[model].$form.validated);
    });


    it('should still be invalid after only all fields made valid', () => {
        fieldsList.map( s => {
            if (s.type === inputTypes.TEXT) {
                console.log('text input id: #'+ s.name);

                form.find('#' + s.name).node.value = 'aaa';
                form.find('#' + s.name).simulate('change', form.find('#' + s.name));

                assert.isTrue(store.getState().adminForms.forms[model][s.name].valid);
            }
            // else if(s.type === inputTypes.DROPDOWN){
            //     console.log(store.getState().options[optionsStoreKeys.RUN_TYPES]);
            //     console.log('dropdown id: #'+ s.name);
            //
            //     form.find('#' + s.name).node.value = '1';
            //     form.find('#' + s.name).simulate('change', form.find('#' + s.name));
            //
            //     assert.isTrue(store.getState().adminForms.forms[model][s.name].valid);
            // }
        });

        assert.isTrue(store.getState().adminForms.forms[model].$form.valid);

    });

}

// describe('AdminDataForm - Users (Unit Test)', () => {
//     let formModel = adminData[tableNames.USERS].model;
//     let form = mount(
//         <Provider store={store}>
//             <CommonAdminForms table={tableNames.USERS} />
//         </Provider>
//     );
//
//     it('should initially be invalid', () => {
//         assert.isFalse(store.getState().adminForms.forms[formModel].$form.validated);
//     });
//
//     it('should be valid after only all fields made valid', () => {
//
//         let firstName = form.find('#firstName');
//         firstName.node.value = 'changed';
//         firstName.simulate('change', firstName);
//         //lastName.value = 'changed';
//         //login.value = 'changed';
//         //phone.value = 'changed';
//         //email.value = 'changed';
//         //address.value = 'changed';
//
//         assert.isTrue(store.getState().adminForms.forms[formModel].firstName.valid);
//         //assert.isTrue(store.getState().adminForms.forms[formModel].lastName.valid);
//         // assert.isTrue(store.getState().adminForms.forms[formModel].login.valid);
//         // assert.isTrue(store.getState().adminForms.forms[formModel].phone.valid);
//         // assert.isTrue(store.getState().adminForms.forms[formModel].email.valid);
//         // assert.isTrue(store.getState().adminForms.forms[formModel].address.valid);
//
//
//         //assert.isFalse(store.getState().adminForms.forms[formModel].$form.submitFailed);
//
//     });
// });

describe('AdminDataForm - FlowcellTypes (Unit Test)', () => {
    let fieldsList = adminData[tableNames.FLOWCELL_TYPES].fields;
    let model = adminData[tableNames.FLOWCELL_TYPES].model;
    makeUTforAdminForms(tableNames.FLOWCELL_TYPES, model, fieldsList);

});

describe('AdminDataForm - ANALYSIS_TYPES (Unit Test)', () => {
    let model = adminData[tableNames.ANALYSIS_TYPES].model;
    let fieldsList = adminData[tableNames.ANALYSIS_TYPES].fields;
    makeUTforAdminForms(tableNames.ANALYSIS_TYPES, model, fieldsList);
});

describe('AdminDataForm - INSTRUMENTS (Unit Test)', () => {
    let model = adminData[tableNames.INSTRUMENTS].model;
    let fieldsList = adminData[tableNames.INSTRUMENTS].fields;
    makeUTforAdminForms(tableNames.INSTRUMENTS, model, fieldsList);
});

describe('AdminDataForm - LIBRARY_ADAPTERS (Unit Test)', () => {
    let model = adminData[tableNames.LIBRARY_ADAPTERS].model;
    let fieldsList = adminData[tableNames.LIBRARY_ADAPTERS].fields;
    makeUTforAdminForms(tableNames.LIBRARY_ADAPTERS, model, fieldsList);
});

describe('AdminDataForm - LIB_PROTOCOLS (Unit Test)', () => {
    let model = adminData[tableNames.LIB_PROTOCOLS].model;
    let fieldsList = adminData[tableNames.LIB_PROTOCOLS].fields;
    makeUTforAdminForms(tableNames.LIB_PROTOCOLS, model, fieldsList);
});

describe('AdminDataForm - LIBRARY_STATES (Unit Test)', () => {
    let model = adminData[tableNames.LIBRARY_STATES].model;
    let fieldsList = adminData[tableNames.LIBRARY_STATES].fields;
    makeUTforAdminForms(tableNames.LIBRARY_STATES, model, fieldsList);
});

describe('AdminDataForm - MAPPING_TOOLS (Unit Test)', () => {
    let model = adminData[tableNames.MAPPING_TOOLS].model;
    let fieldsList = adminData[tableNames.MAPPING_TOOLS].fields;
    makeUTforAdminForms(tableNames.MAPPING_TOOLS, model, fieldsList);
});

describe('AdminDataForm - MULTIPLEX_INDEXES (Unit Test)', () => {
    let model = adminData[tableNames.MULTIPLEX_INDEXES].model;
    let fieldsList = adminData[tableNames.MULTIPLEX_INDEXES].fields;
    makeUTforAdminForms(tableNames.MULTIPLEX_INDEXES, model, fieldsList);
});

describe('AdminDataForm - PIPELINE_VERSIONS (Unit Test)', () => {
    let model = adminData[tableNames.PIPELINE_VERSIONS].model;
    let fieldsList = adminData[tableNames.PIPELINE_VERSIONS].fields;
    makeUTforAdminForms(tableNames.PIPELINE_VERSIONS, model, fieldsList);
});

describe('AdminDataForm - PROJECT_ANALYSIS (Unit Test)', () => {
    let model = adminData[tableNames.PROJECT_ANALYSIS].model;
    let fieldsList = adminData[tableNames.PROJECT_ANALYSIS].fields;
    makeUTforAdminForms(tableNames.PROJECT_ANALYSIS, model, fieldsList);
});

describe('AdminDataForm - PROJECT_STATES (Unit Test)', () => {
    let model = adminData[tableNames.PROJECT_STATES].model;
    let fieldsList = adminData[tableNames.PROJECT_STATES].fields;
    makeUTforAdminForms(tableNames.PROJECT_STATES, model, fieldsList);
});

describe('AdminDataForm - QUANTIF_METHODS (Unit Test)', () => {
    let model = adminData[tableNames.QUANTIF_METHODS].model;
    let fieldsList = adminData[tableNames.QUANTIF_METHODS].fields;
    makeUTforAdminForms(tableNames.QUANTIF_METHODS, model, fieldsList);
});

describe('AdminDataForm - READ_LENGTHS (Unit Test)', () => {
    let model = adminData[tableNames.READ_LENGTHS].model;
    let fieldsList = adminData[tableNames.READ_LENGTHS].fields;
    makeUTforAdminForms(tableNames.READ_LENGTHS, model, fieldsList);
});

describe('AdminDataForm - RUN_TYPES (Unit Test)', () => {
    let model = adminData[tableNames.RUN_TYPES].model;
    let fieldsList = adminData[tableNames.RUN_TYPES].fields;
    makeUTforAdminForms(tableNames.RUN_TYPES, model, fieldsList);
});



describe('AdminDataForm - SAMPLE_TYPES (Unit Test)', () => {
    let model = adminData[tableNames.SAMPLE_TYPES].model;
    let fieldsList = adminData[tableNames.SAMPLE_TYPES].fields;
    makeUTforAdminForms(tableNames.SAMPLE_TYPES, model, fieldsList);
});

describe('AdminDataForm - SEQUENCING_KIT_VERSIONS (Unit Test)', () => {
    let model = adminData[tableNames.SEQUENCING_KIT_VERSIONS].model;
    let fieldsList = adminData[tableNames.SEQUENCING_KIT_VERSIONS].fields;
    makeUTforAdminForms(tableNames.SEQUENCING_KIT_VERSIONS, model, fieldsList);
});

describe('AdminDataForm - SEQUENCING_QUALITIES (Unit Test)', () => {
    let model = adminData[tableNames.SEQUENCING_QUALITIES].model;
    let fieldsList = adminData[tableNames.SEQUENCING_QUALITIES].fields;
    makeUTforAdminForms(tableNames.SEQUENCING_QUALITIES, model, fieldsList);
});

describe('AdminDataForm - TAXONOMIES (Unit Test)', () => {
    let model = adminData[tableNames.TAXONOMIES].model;
    let fieldsList = adminData[tableNames.TAXONOMIES].fields;
    makeUTforAdminForms(tableNames.TAXONOMIES, model, fieldsList);
});

// describe('AdminDataForm - RUN_TYPES_LENGTHS (Unit Test)', () => {
//     let model = adminData[tableNames.RUN_TYPES_LENGTHS].model;
//     let fieldsList = adminData[tableNames.RUN_TYPES_LENGTHS].fields;
//     makeUTforAdminForms(tableNames.RUN_TYPES_LENGTHS, model, fieldsList);
// });