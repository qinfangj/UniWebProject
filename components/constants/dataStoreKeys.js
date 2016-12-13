/**
 * Options dropdown lists are used in several forms, and are the result
 * of the same backend db query. There is no reason to create one entry per form
 * in the store.
 */

export default {
    PROJECTS_ALL: "PROJECTS_ALL",
    PROJECTS_WITH_LIBRARY: "PROJECTS_WITH_LIBRARY",
    PROJECTS_WITH_SAMPLE: "PROJECTS_WITH_SAMPLE",

    // secondaryLists
    SAMPLES_FOR_PROJECTS: "SAMPLES_FOR_PROJECTS",

    // search samples taht contain a given string (for Query Projects)
    SAMPLES_BY_TERM: "SAMPLES_BY_TERM",

    // query projects types
    STARTING_MATERIAL_INFO: "STARTING_MATERIAL_INFO",
};