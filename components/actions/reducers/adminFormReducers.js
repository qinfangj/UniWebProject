"use strict";
import {combineForms,formReducer} from  'react-redux-form'
import adminDataConstants from '../../forms/adminData/adminDataModels';

/**
 * Fills an object `initalData` with the initial form values.
 * when field is string type (text input), will be initialized to empty string
 * when fields is Boolean (checkbox),will be initialized to false
 */
function initialAdminForms(table) {
    var initalData = {};
    adminDataConstants[table].fields.map(
        (s) => {
            if (s.type === "" || s.type === undefined) {
                initalData[s.name] = '';
            }else if (s.type === "Boolean"){
                initalData[s.name] = false;
            }
        });
    return initalData;
}

let adminFormReducers = combineForms(
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
        projectSharingsForm : initialAdminForms("project_sharings"),
        limsUsersForm : initialAdminForms("users")
    }
    ,'adminForms');


export default adminFormReducers;