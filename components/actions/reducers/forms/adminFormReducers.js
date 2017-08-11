"use strict";
import adminDataModels from '../../../forms/adminData/adminDataModels';
import { combineForms } from  'react-redux-form'
import inputTypes from '../../../constants/inputTypes';

/**
 * Fills an object `initalData` with the initial form values.
 * when field is string type (text input), will be initialized to empty string
 * when fields is Boolean (checkbox),will be initialized to false
 */
function initialAdminForms(table) {
    let initialData = {};
    adminDataModels[table].fields.forEach((s) => {
        if (s.inputType === inputTypes.TEXT) {
            initialData[s.name] = "";
        } else if (s.inputType === inputTypes.CHECKBOX) {
            initialData[s.name] = false;
        } else if (s.inputType === inputTypes.DROPDOWN) {
            initialData[s.name] = "";
        }
    });
    return initialData;
}

/**
 * React-redux-forms reducer - Initial form data for adminData.
 */
let adminFormReducers = combineForms(
    {
        analysisTypeForm: initialAdminForms("pipeline_analysis_types"),
        flowcellTypesForm: initialAdminForms("flowcell_types"),
        instrumentsForm: initialAdminForms("instruments"),
        libAdaptersForm: initialAdminForms("library_adapters"),
        libProtocolsForm: initialAdminForms("lib_protocols"),
        libStatesForm: initialAdminForms("library_states"),
        mappingToolsForm: initialAdminForms("mapping_tools"),
        multiplexIndexesForm: initialAdminForms("multiplex_indexes"),
        pipelineVersionForm: initialAdminForms("pipeline_versions"),
        projectAnalysisForm: initialAdminForms("project_analysis"),
        projectStatesForm: initialAdminForms("project_states"),
        quantifMethodsForm: initialAdminForms("quantif_methods"),
        readLengthsForm: initialAdminForms("read_lengths"),
        runTypesForm: initialAdminForms("run_types"),
        runTypesLengthsForm: initialAdminForms("run_types_lengths"),
        samplesTypesForm: initialAdminForms("sample_types"),
        seqKitVersionForm: initialAdminForms("sequencing_kit_versions"),
        seqQualitiesForm: initialAdminForms("sequencing_qualities"),
        taxonomiesForm: initialAdminForms("taxonomies"),
        projectSharingsForm: initialAdminForms("project_sharings"),
        limsUsersForm: initialAdminForms("users"),
        uhtsApplicationsForm: initialAdminForms("uhts_applications")
    }
    ,'adminForms');


export default adminFormReducers;