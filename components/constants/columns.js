"use strict";

/**
 * Column keys in Ag-Grig columns definition files,
 * i.e. not the columns names, but the keys to the different column definition objects.
 */


export default {

    /* The same keys are used in backend (ProjectsListingController) */
    queryProjects: {
        STARTING_MATERIAL_INFO: "starting_material",
        USER_REQUEST_INFO: "user_request",
        LIBRARY_INFO: "library",
        SEQUENCING_DETAILS_INFO: "sequencing_details",
        SAMPLE_SHEETS_INFO: "sample_sheets",
        IVC_PLOTS: "ivc_plots",
        DEMULTIPLEXING_INFO: "demultiplexing",
        ALIGNMENTS_INFO: "alignments"
    }
};