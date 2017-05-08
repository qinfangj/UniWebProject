"use strict";
import types from '../actionTypes';
import RestService from '../../../utils/RestService';
import { assertStoreKey, asyncAction } from './base';
import optionsStoreKeys from '../../constants/optionsStoreKeys';


/* Select options. */

export function getOptionsListAsync(tableName, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.forms.GET_OPTIONS_LIST, RestService.getOptionsList.bind(null, tableName), args)
}

export function getConditionalOptionsListAsync(tableName, suffix, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey, suffix};
    return asyncAction(types.forms.GET_OPTIONS_LIST, RestService.getConditionalOptionsList.bind(null, tableName, suffix), args)
}

export function getSecondaryOptionsListAsync(tableName, id, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey, id};
    return asyncAction(types.forms.GET_SECONDARY_OPTIONS_LIST, RestService.getSecondaryOptionsList.bind(null, tableName, id), args)
}

//---------------------------------------------------

function requestOptionsListAsync(actionType, tableName, suffix) {
    if (suffix) {
        return asyncAction(actionType, RestService.getConditionalOptionsList.bind(null, tableName, suffix), {});
    } else {
        return asyncAction(actionType, RestService.getOptionsList.bind(null, tableName), {});
    }
}

//===

export function requestFlowcellTypes() {
    return requestOptionsListAsync(types.options.OPTIONS_FLOWCELL_TYPES, "flowcell_types");
}

export function requestInstruments() {
    return requestOptionsListAsync(types.options.OPTIONS_INSTRUMENTS, "instruments");
}

export function requestLibProtocols() {
    return requestOptionsListAsync(types.options.OPTIONS_LIB_PROTOCOLS, "lib_protocols");
}

export function requestLibraryStates() {
    return requestOptionsListAsync(types.options.OPTIONS_LIB_STATES, "library_states");
}

export function requestMappingTools() {
    return requestOptionsListAsync(types.options.OPTIONS_MAPPING_TOOLS, "mapping_tools");
}

export function requestAllPeople() {
    return requestOptionsListAsync(types.options.OPTIONS_PEOPLE, "people", "all");
}

export function requestLaboratories() {
    return requestOptionsListAsync(types.options.OPTIONS_LABORATORIES, "people", "labs");
}

export function requestPipelineAnalysisTypes() {
    return requestOptionsListAsync(types.options.OPTIONS_PIPELINE_ANALYSIS_TYPES, "pipeline_analysis_types");
}

export function requestPipelineVersions() {
    return requestOptionsListAsync(types.options.OPTIONS_PIPELINE_VERSIONS, "pipeline_versions");
}

export function requestAllProjects() {
    return requestOptionsListAsync(types.options.OPTIONS_PROJECTS, "projects", "all");
}

export function requestProjectsHavingALibrary() {
    return requestOptionsListAsync(types.options.OPTIONS_PROJECTS_HAVING_A_LIBRARY, "projects", "libs");
}

export function requestProjectsHavingASample() {
    return requestOptionsListAsync(types.options.OPTIONS_PROJECTS_HAVING_A_SAMPLE, "projects", "samples");
}

export function requestProjectsHavingAPool() {
    return requestOptionsListAsync(types.options.OPTIONS_PROJECTS_HAVING_A_POOL, "projects", "pools");
}

export function requestProjectAnalyses() {
    return requestOptionsListAsync(types.options.OPTIONS_PROJECT_ANALYSES, "project_analysis");
}

export function requestProjectStates() {
    return requestOptionsListAsync(types.options.OPTIONS_PROJECT_STATES, "project_states");
}

export function requestRunsOutputFolders() {
    return requestOptionsListAsync(types.options.OPTIONS_RUNS_OUTPUT_FOLDERS, "runs");
}

export function requestRunsTypesLengths() {
    return requestOptionsListAsync(types.options.OPTIONS_RUN_TYPES_LENGTHS, "run_types_lengths");
}

export function requestSampleTypes() {
    return requestOptionsListAsync(types.options.OPTIONS_SAMPLE_TYPES, "sample_types");
}

export function requestSequencingKitVersions() {
    return requestOptionsListAsync(types.options.OPTIONS_SEQUENCING_KIT_VERSIONS, "sequencing_kit_versions");
}

export function requestSequencingQualities() {
    return requestOptionsListAsync(types.options.OPTIONS_SEQUENCING_QUALITIES, "sequencing_qualities");
}

export function requestTaxonomies() {
    return requestOptionsListAsync(types.options.OPTIONS_TAXONOMIES, "taxonomies");
}

//===

export default function requestOptions(storeKey) {
    switch(storeKey) {
        case optionsStoreKeys.FLOWCELL_TYPES:
            return requestFlowcellTypes();

        case optionsStoreKeys.INSTRUMENTS:
            return requestInstruments();

        case optionsStoreKeys.LIB_PROTOCOLS:
            return requestLibProtocols();

        case optionsStoreKeys.LIB_STATES:
            return requestLibraryStates();

        case optionsStoreKeys.MAPPING_TOOLS:
            return requestMappingTools();

        case optionsStoreKeys.PEOPLE:
            return requestAllPeople();

        case optionsStoreKeys.LABORATORIES:
            return requestLaboratories();

        case optionsStoreKeys.PIPELINE_ANALYSIS_TYPES:
            return requestPipelineAnalysisTypes();

        case optionsStoreKeys.PIPELINE_VERSIONS:
            return requestPipelineVersions();

        case optionsStoreKeys.PROJECTS:
            return requestAllProjects();

        case optionsStoreKeys.PROJECTS_HAVING_A_LIBRARY:
            return requestProjectsHavingALibrary();

        case optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE:
            return requestProjectsHavingASample();

        case optionsStoreKeys.PROJECTS_HAVING_A_POOL:
            return requestProjectsHavingAPool();

        case optionsStoreKeys.PROJECT_ANALYSES:
            return requestProjectAnalyses();

        case optionsStoreKeys.PROJECT_STATES:
            return requestProjectStates();

        case optionsStoreKeys.RUNS_OUTPUT_FOLDERS:
            return requestRunsOutputFolders();

        case optionsStoreKeys.RUN_TYPES_LENGTHS:
            return requestRunsTypesLengths();

        case optionsStoreKeys.SAMPLE_TYPES:
            return requestSampleTypes();

        case optionsStoreKeys.SEQUENCING_KIT_VERSIONS:
            return requestSequencingKitVersions();

        case optionsStoreKeys.SEQUENCING_QUALITIES:
            return requestSequencingQualities();

        case optionsStoreKeys.TAXONOMIES:
            return requestTaxonomies();

        default:
            break;
    }
}