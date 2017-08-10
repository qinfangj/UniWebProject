"use strict";
import types from '../../actionTypes';
import returnList from '../base';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';


const defaultState = {
    [optionsStoreKeys.INSTRUMENTS]: [],
    [optionsStoreKeys.FLOWCELL_TYPES]: [],
    [optionsStoreKeys.LABORATORIES]: [],
    [optionsStoreKeys.LIB_ADAPTERS]: [],
    [optionsStoreKeys.LIB_PROTOCOLS]: [],
    [optionsStoreKeys.LIB_STATES]: [],
    [optionsStoreKeys.MAPPING_TOOLS]: [],
    [optionsStoreKeys.MULTIPLEX_INDEXES]: [],
    [optionsStoreKeys.PEOPLE]: [],
    [optionsStoreKeys.PIPELINE_ANALYSIS_TYPES]: [],
    [optionsStoreKeys.PIPELINE_VERSIONS]: [],
    [optionsStoreKeys.PROJECTS_ALL]: [],
    [optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE]: [],
    [optionsStoreKeys.PROJECTS_HAVING_A_LIBRARY]: [],
    [optionsStoreKeys.PROJECTS_HAVING_A_POOL]: [],
    [optionsStoreKeys.PROJECT_ANALYSES]: [],
    [optionsStoreKeys.PROJECT_STATES]: [],
    [optionsStoreKeys.QUANTIF_METHODS]: [],
    [optionsStoreKeys.READ_LENGTHS]: [],
    [optionsStoreKeys.RUNS_OUTPUT_FOLDERS]: [],
    [optionsStoreKeys.RUN_TYPES]: [],
    [optionsStoreKeys.RUN_TYPES_LENGTHS]: [],
    [optionsStoreKeys.SAMPLE_TYPES]: [],
    [optionsStoreKeys.SEQUENCING_KIT_VERSIONS]: [],
    [optionsStoreKeys.SEQUENCING_QUALITIES]: [],
    [optionsStoreKeys.TAXONOMIES]: [],
    [optionsStoreKeys.UHTS_APPLICATIONS]: [],
    [optionsStoreKeys.ROLES]: [
        ["no_access", "no access"],
        ["customer", "customer"],
        ["facility", "facility"],
        ["admin", "admin"]
    ],
};


function formatInstruments(v) { return [v.id, v.name]; }
function formatFlowcellTypes(v) { return [v.id, v.version]; }
function formatLibAdapters(v) { return [v.id, v.name]; }
function formatLibProtocols(v) { return [v.id, v.shortName]; }
function formatLibStates(v) { return [v.id, v.stateOrder +" - "+ v.name]; }
function formatMappingTools(v) { return [v.id, v.name]; }
function formatMultiplexIndexes(v) { return [v.id, v.name +" - "+ v.sequence]; }
function formatPeople(v) { return [v.id, v.lastName +" "+ v.firstName]; }
function formatPipelineAnalysisTypes(v) { return [v.id, v.description]; }
function formatPipelineVersions(v) { return [v.id, v.softwareName +" - "+ v.number]; }
function formatProjects(v) { return [v.id, v.lastName +" - "+ v.name]; }
function formatProjectAnalyses(v) { return [v.id, v.name]; }
function formatProjectStates(v) { return [v.id, v.name]; }
function formatQuantifMethods(v) { return [v.id, v.name]; }
function formatReadLengths(v) { return [v.id, v.length]; }
function formatRunsOutputFolders(v) { return [v.id, v.runFolder]; }
function formatRunTypes(v) { return [v.id, v.name]; }
function formatRunTypesLengths(v) { return [v.id, v.name +' '+ v.length]; }
function formatSampleTypes(v) { return [v.id, v.name]; }
function formatSequencingKitVersions(v) { return [v.id, v.version]; }
function formatSequencingQualities(v) { return [v.id, v.name]; }
function formatTaxonomies(v) { return [v.id, v.name]; }
function formatUHTSApplications(v) { return [v.id, v.name]; }



let optionsReducers = (state = defaultState, action) => {

    switch (action.type) {

        /**
         * Reset all cached data for options lists, forcing reload from backend, 
         * typically after some attribute has been changed in admin panel.
         */
        case types.options.RESET:
            return {};

        case types.options.IGNORE_CACHED:
            return state;

        /* Select options list for dropdowns */

        case types.forms.GET_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        case types.forms.GET_SECONDARY_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        //---------------------------

        case types.options.OPTIONS_INSTRUMENTS:
            return returnList(action, state, optionsStoreKeys.INSTRUMENTS, [], formatInstruments);

        case types.options.OPTIONS_FLOWCELL_TYPES:
            return returnList(action, state, optionsStoreKeys.FLOWCELL_TYPES, [], formatFlowcellTypes);

        case types.options.OPTIONS_LABORATORIES:
            return returnList(action, state, optionsStoreKeys.LABORATORIES, [], formatPeople);

        case types.options.OPTIONS_LIB_ADAPTERS:
            return returnList(action, state, optionsStoreKeys.LIB_ADAPTERS, [], formatLibAdapters);

        case types.options.OPTIONS_LIB_PROTOCOLS:
            return returnList(action, state, optionsStoreKeys.LIB_PROTOCOLS, [], formatLibProtocols);

        case types.options.OPTIONS_LIB_STATES:
            return returnList(action, state, optionsStoreKeys.LIB_STATES, [], formatLibStates);

        case types.options.OPTIONS_MAPPING_TOOLS:
            return returnList(action, state, optionsStoreKeys.MAPPING_TOOLS, [], formatMappingTools);

        case types.options.OPTIONS_MULTIPLEX_INDEXES:
            return returnList(action, state, optionsStoreKeys.MULTIPLEX_INDEXES, [], formatMultiplexIndexes);

        case types.options.OPTIONS_PEOPLE:
            return returnList(action, state, optionsStoreKeys.PEOPLE, [], formatPeople);

        case types.options.OPTIONS_PIPELINE_ANALYSIS_TYPES:
            return returnList(action, state, optionsStoreKeys.PIPELINE_ANALYSIS_TYPES, [], formatPipelineAnalysisTypes);

        case types.options.OPTIONS_PIPELINE_VERSIONS:
            return returnList(action, state, optionsStoreKeys.PIPELINE_VERSIONS, [], formatPipelineVersions);

        case types.options.OPTIONS_PROJECTS:
            return returnList(action, state, optionsStoreKeys.PROJECTS_ALL, [], formatProjects);

        case types.options.OPTIONS_PROJECTS_HAVING_A_LIBRARY:
            return returnList(action, state, optionsStoreKeys.PROJECTS_HAVING_A_LIBRARY, [], formatProjects);

        case types.options.OPTIONS_PROJECTS_HAVING_A_SAMPLE:
            return returnList(action, state, optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE, [], formatProjects);

        case types.options.OPTIONS_PROJECTS_HAVING_A_POOL:
            return returnList(action, state, optionsStoreKeys.PROJECTS_HAVING_A_POOL, [], formatProjects);

        case types.options.OPTIONS_PROJECT_ANALYSES:
            return returnList(action, state, optionsStoreKeys.PROJECT_ANALYSES, [], formatProjectAnalyses);

        case types.options.OPTIONS_PROJECT_STATES:
            return returnList(action, state, optionsStoreKeys.PROJECT_STATES, [], formatProjectStates);

        case types.options.OPTIONS_QUANTIF_METHODS:
            return returnList(action, state, optionsStoreKeys.QUANTIF_METHODS, [], formatQuantifMethods);

        case types.options.OPTIONS_READ_LENGHTS:
            return returnList(action, state, optionsStoreKeys.READ_LENGTHS, [], formatReadLengths);

        case types.options.OPTIONS_RUNS_OUTPUT_FOLDERS:
            return returnList(action, state, optionsStoreKeys.RUNS_OUTPUT_FOLDERS, [], formatRunsOutputFolders);

        case types.options.OPTIONS_RUN_TYPES:
            return returnList(action, state, optionsStoreKeys.RUN_TYPES, [], formatRunTypes);

        case types.options.OPTIONS_RUN_TYPES_LENGTHS:
            return returnList(action, state, optionsStoreKeys.RUN_TYPES_LENGTHS, [], formatRunTypesLengths);

        case types.options.OPTIONS_SAMPLE_TYPES:
            return returnList(action, state, optionsStoreKeys.SAMPLE_TYPES, [], formatSampleTypes);

        case types.options.OPTIONS_SEQUENCING_KIT_VERSIONS:
            return returnList(action, state, optionsStoreKeys.SEQUENCING_KIT_VERSIONS, [], formatSequencingKitVersions);

        case types.options.OPTIONS_SEQUENCING_QUALITIES:
            return returnList(action, state, optionsStoreKeys.SEQUENCING_QUALITIES, [], formatSequencingQualities);

        case types.options.OPTIONS_TAXONOMIES:
            return returnList(action, state, optionsStoreKeys.TAXONOMIES, [], formatTaxonomies);
        case types.options.OPTIONS_UHTSAPPLICATIONS:
            return returnList(action, state, optionsStoreKeys.UHTS_APPLICATIONS, [], formatUHTSApplications);

        default:
            return state;
    }

};


export default optionsReducers;

