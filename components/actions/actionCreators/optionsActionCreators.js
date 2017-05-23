"use strict";
import types from '../actionTypes';
import store from '../../../core/store';
import RestService from '../../../utils/RestService';
import { syncAction, asyncAction } from './base';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import constants from '../../constants/constants';


/*
 * Actions to GET a select input options list from backend.
 */

export function resetAllOptions() {
    return {
        type: types.options.RESET
    };
}
 
/**
 * Calls /table/:table/list[/suffix]
 */
function requestOptionsListAsync(actionType, storeKey, tableName, suffix) {
    // Cached
    let maybeCached = store.getState().options[storeKey];
    if (maybeCached) {
        console.log("CACHED!!!")
        return {
            type: types.options.IGNORE_CACHED
        };
    } else {
        if (suffix) {
            return asyncAction(actionType, RestService.getConditionalOptionsList.bind(null, tableName, suffix), {});
        } else {
            return asyncAction(actionType, RestService.getOptionsList.bind(null, tableName), {});
        }
    }
}


export function requestFlowcellTypes() {
    let storeKey = optionsStoreKeys.FLOWCELL_TYPES;
    return requestOptionsListAsync(types.options.OPTIONS_FLOWCELL_TYPES, storeKey, "flowcell_types");
}

export function requestInstruments() {
    let storeKey = optionsStoreKeys.INSTRUMENTS;
    return requestOptionsListAsync(types.options.OPTIONS_INSTRUMENTS, storeKey, "instruments");
}

export function requestLibAdapters() {
    let storeKey = optionsStoreKeys.LIB_ADAPTERS;
    return requestOptionsListAsync(types.options.OPTIONS_LIB_ADAPTERS, storeKey, "library_adapters");
}

export function requestLibProtocols() {
    let storeKey = optionsStoreKeys.LIB_PROTOCOLS;
    return requestOptionsListAsync(types.options.OPTIONS_LIB_PROTOCOLS, storeKey, "lib_protocols");
}

export function requestLibraryStates() {
    let storeKey = optionsStoreKeys.LIB_STATES;
    return requestOptionsListAsync(types.options.OPTIONS_LIB_STATES, storeKey, "library_states");
}

export function requestMappingTools() {
    let storeKey = optionsStoreKeys.MAPPING_TOOLS;
    return requestOptionsListAsync(types.options.OPTIONS_MAPPING_TOOLS, storeKey, "mapping_tools");
}

export function requestAllPeople() {
    let storeKey = optionsStoreKeys.PEOPLE;
    return requestOptionsListAsync(types.options.OPTIONS_PEOPLE, storeKey, "people", "all");
}

export function requestLaboratories() {
    let storeKey = optionsStoreKeys.LABORATORIES;
    return requestOptionsListAsync(types.options.OPTIONS_LABORATORIES, storeKey, "people", "labs");
}

export function requestPipelineAnalysisTypes() {
    let storeKey = optionsStoreKeys.PIPELINE_ANALYSIS_TYPES;
    return requestOptionsListAsync(types.options.OPTIONS_PIPELINE_ANALYSIS_TYPES, storeKey, "pipeline_analysis_types");
}

export function requestPipelineVersions() {
    let storeKey = optionsStoreKeys.PIPELINE_VERSIONS;
    return requestOptionsListAsync(types.options.OPTIONS_PIPELINE_VERSIONS, storeKey, "pipeline_versions");
}

export function requestAllProjects() {
    let storeKey = optionsStoreKeys.PROJECTS;
    return requestOptionsListAsync(types.options.OPTIONS_PROJECTS, storeKey, "projects", "all");
}

export function requestProjectsHavingALibrary() {
    let storeKey = optionsStoreKeys.PROJECTS_HAVING_A_LIBRARY;
    return requestOptionsListAsync(types.options.OPTIONS_PROJECTS_HAVING_A_LIBRARY, storeKey, "projects", "libs");
}

export function requestProjectsHavingASample() {
    let storeKey = optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE;
    return requestOptionsListAsync(types.options.OPTIONS_PROJECTS_HAVING_A_SAMPLE, storeKey, "projects", "samples");
}

export function requestProjectsHavingAPool() {
    let storeKey = optionsStoreKeys.PROJECTS_HAVING_A_POOL;
    return requestOptionsListAsync(types.options.OPTIONS_PROJECTS_HAVING_A_POOL, storeKey, "projects", "pools");
}

export function requestProjectAnalyses() {
    let storeKey = optionsStoreKeys.PROJECT_ANALYSES;
    return requestOptionsListAsync(types.options.OPTIONS_PROJECT_ANALYSES, storeKey, "project_analysis");
}

export function requestProjectStates() {
    let storeKey = optionsStoreKeys.PROJECT_STATES;
    return requestOptionsListAsync(types.options.OPTIONS_PROJECT_STATES, storeKey, "project_states");
}

export function requestQuantifMethods() {
    let storeKey = optionsStoreKeys.QUANTIF_METHODS;
    return requestOptionsListAsync(types.options.OPTIONS_QUANTIF_METHODS, storeKey, "quantif_methods");
}

export function requestRunsOutputFolders() {
    let storeKey = optionsStoreKeys.RUNS_OUTPUT_FOLDERS;
    return requestOptionsListAsync(types.options.OPTIONS_RUNS_OUTPUT_FOLDERS, storeKey, "runs");
}

export function requestRunsTypesLengths() {
    let storeKey = optionsStoreKeys.RUN_TYPES_LENGTHS;
    return requestOptionsListAsync(types.options.OPTIONS_RUN_TYPES_LENGTHS, storeKey, "run_types_lengths", "all");
}

export function requestSampleTypes() {
    let storeKey = optionsStoreKeys.SAMPLE_TYPES;
    return requestOptionsListAsync(types.options.OPTIONS_SAMPLE_TYPES, storeKey, "sample_types");
}

export function requestSequencingKitVersions() {
    let storeKey = optionsStoreKeys.SEQUENCING_KIT_VERSIONS;
    return requestOptionsListAsync(types.options.OPTIONS_SEQUENCING_KIT_VERSIONS, storeKey, "sequencing_kit_versions");
}

export function requestSequencingQualities() {
    let storeKey = optionsStoreKeys.SEQUENCING_QUALITIES;
    return requestOptionsListAsync(types.options.OPTIONS_SEQUENCING_QUALITIES, storeKey, "sequencing_qualities");
}

export function requestTaxonomies() {
    let storeKey = optionsStoreKeys.TAXONOMIES;
    return requestOptionsListAsync(types.options.OPTIONS_TAXONOMIES, storeKey, "taxonomies");
}



export default function requestOptions(storeKey) {
    switch(storeKey) {
        case optionsStoreKeys.FLOWCELL_TYPES:
            return requestFlowcellTypes();

        case optionsStoreKeys.INSTRUMENTS:
            return requestInstruments();

        case optionsStoreKeys.LIB_ADAPTERS:
            return requestLibAdapters();

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

        case optionsStoreKeys.QUANTIF_METHODS:
            return requestQuantifMethods();

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