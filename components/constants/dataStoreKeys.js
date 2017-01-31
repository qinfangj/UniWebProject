/**
 * Options dropdown lists are used in several forms, and are the result
 * of the same backend db query. There is no reason to create one entry per form
 * in the store, so the same data is reused of the same dataStoreKey is used.
 */

export default {
    PROJECTS_ALL: "PROJECTS_ALL",
    PROJECTS_WITH_LIBRARY: "PROJECTS_WITH_LIBRARY",
    PROJECTS_WITH_SAMPLE: "PROJECTS_WITH_SAMPLE",

    // primary lists
    INSTRUMENTS: "INSTRUMENTS",
    LIB_PROTOCOLS: "LIB_PROTOCOLS",
    LIB_ADAPTERS: "LIB_ADAPTERS",
    LIB_STATES: "LIB_STATES",
    FLOWCELL_TYPES: "FLOWCELL_TYPES",
    MAPPING_TOOLS: "MAPPING_TOOLS",
    MULTIPLEX_INDEXES: "MULTIPLEX_INDEXES",
    PEOPLE: "PEOPLE",
    PIPELINE_ANALYSIS_TYPES: "PIPELINE_ANALYSIS_TYPES",
    PIPELINE_VERSIONS: "PIPELINE_VERSIONS",
    PROJECTS: "PROJECTS",
    PROJECTS_WITH_SAMPLES: "PROJECTS_WITH_SAMPLES",
    PROJECTS_WITH_LIBRARIES: "PROJECTS_WITH_LIBRARIES",
    PROJECTS_WITH_POOL: "PROJECTS_WITH_POOL",
    PROJECT_ANALYSES: "PROJECT_ANALYSES",
    PROJECT_STATES: "PROJECT_STATES",
    QUANTIF_METHODS: "QUANTIF_METHODS",
    RUNS_LIST: "RUNS_LIST",
    RUNS_OUTPUT_FOLDERS: "RUNS_OUTPUT_FOLDERS",
    RUN_TYPES_LENGTHS: "RUN_TYPES_LENGTHS",
    SAMPLE_TYPES: "SAMPLE_TYPES",
    SEQUENCING_KIT_VERSIONS: "SEQUENCING_KIT_VERSIONS",
    SEQUENCING_QUALITIES: "SEQUENCING_QUALITIES",
    TAXONOMIES: "TAXONOMIES",

    // secondaryLists
    BASECALLINGS_OUTPUT_FOLDERS: "BASECALLINGS_OUTPUT_FOLDERS",
    SAMPLES_FROM_PROJECT: "SAMPLES_FROM_PROJECT",
    POOLS_FROM_PROJECT: "POOLS_FROM_PROJECT",
    LIBRAIRIES_FROM_PROJECT: "LIBRAIRIES_FROM_PROJECT",

    // Query projects
    SAMPLES_FOR_PROJECTS: "SAMPLES_FOR_PROJECTS",  // samples for a multiple selection of projects (secondary list)
    SAMPLES_BY_TERM: "SAMPLES_BY_TERM",  // samples that contain a given string
};