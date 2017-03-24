"use strict";
import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import facilityDataReducers from '../components/actions/reducers/facilityDataReducers';
import commonReducers from '../components/actions/reducers/commonReducers';
import authReducers from '../components/actions/reducers/authReducers';
import queryProjectsReducers from '../components/actions/reducers/queryProjectsReducers';
import formReducers from '../components/actions/reducers/formReducers';

import {combineForms,formReducer} from  'react-redux-form'
import adminDataConstants from '../components/forms/adminData/AdminDataConstants';

/*
 * Redux store
 */

/*
 * store.getState() will return an object of the form
 * { <reducer1> key: ...,
 *   <reducer2> key: ...,
 *   ...
 *  }
 */

const logger = createLogger({
    collapsed: true,
    diff: false,
});

let middleware = [thunk];
console.log("store.js :: NODE_ENV:", process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'TEST') {
    middleware = [ ...middleware, logger ]
}

/**
 * Fills an object `initalData` with the initial form values (always '' in the case of admin forms).
 */
function initialAdminForms(table) {
    var initalData = {};
    adminDataConstants[table].fields.map(
        (s) => {
            initalData[s.name] = '';
        });
    return initalData;
}

let reducer = combineReducers({
    facilityData: facilityDataReducers,
    common: commonReducers,
    auth: authReducers,
    queryProjects: queryProjectsReducers,

    adminForms:combineForms(
        {
            analysisTypeForm: initialAdminForms("pipeline_analysis_types"),
            flowcellTypesForm: initialAdminForms("flowcell_types"),
            instrumentsForm: initialAdminForms("instruments"),
            libAdaptersForm:  initialAdminForms("library_adapters"),
            libProtocolsForm:  initialAdminForms("lib_protocols"),
            libStatesForm:  initialAdminForms("library_states"),
            mappingToolsForm:initialAdminForms("mapping_tools"),
            multiplexIndexesForm :initialAdminForms("multiplex_indexes"),
            pipelineVersionForm :initialAdminForms("pipeline_versions"),
            projectAnalysisForm : initialAdminForms("project_analysis"),
            projectStatesForm:initialAdminForms("project_states"),
            quantifMethodsForm :initialAdminForms("quantif_methods"),
            readLengthsForm : initialAdminForms("read_lengths"),
            runTypesForm : initialAdminForms("run_types"),
            runTypesLengthsForm :initialAdminForms("run_types_lengths"),
            samplesTypesForm : initialAdminForms("sample_types"),
            seqKitVersionForm : initialAdminForms("sequencing_kit_versions"),
            seqQualitiesForm : initialAdminForms("sequencing_qualities"),
            taxonomiesForm : initialAdminForms("taxonomies"),
            projectSharingsForm : initialAdminForms("project_sharings")
        }
    ,'adminForms'),
    forms: formReducers,

});


const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
