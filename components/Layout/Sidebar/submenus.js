"use strict";

import colnames from '../../constants/columns';
import store from '../../../core/store';
import * as qp from '../../actions/actionCreators/queryProjectsActionCreators';
import * as qr from '../../actions/actionCreators/queryRunsActionCreators';


export const facilityDataSubmenu = [
    { text: "Laboratories", to: "/facility/people", },
    { text: "Projects", to: "/facility/projects", },
    { text: "Samples", to: "/facility/samples", },
    { text: "User requests", to: "/facility/user_requests", },
    { text: "Libraries", to: "/facility/libraries", },
    { text: "Bioanalysers", to: "/facility/bioanalysers", disabled: false },
    { text: "Runs", to: "/facility/runs", disabled: false },
    { text: "Base callings / demultiplexings", to: "/facility/basecallings", },
    { text: "Alignments / QC", to: "/facility/alignments", },
    { text: "Genomes", to: "/facility/genomes", },
];

export const userDataSubmenu = [
    { text: "Submit libraries", to: "user/batch/libraries", },
    { text: "Submit samples", to: "user/batch/samples", },
    // { text: "Submit samples and libraries", to: "user/newform", },
    // { text: "Request more sequences", to: "user/newrequest", },
    { text: "View lab submissions", to: "user/view/labsamples", disabled: true },
    { text: "View collaboration submissions", to: "user/view/colsamples", disabled: true },
    { text: "Get lab data", to: "user/data/labsdata"},
    { text: "Get collaboration data", to: "user/data/collabsdata", disabled: true },
];

export const queryProjectsSubmenu = [
    { text: "Sample material info",
      to: `/projects/${colnames.queryProjects.STARTING_MATERIAL_INFO}`,
      action: () => store.dispatch(qp.changeQueryType(colnames.queryProjects.STARTING_MATERIAL_INFO)),
    },{
      text: "User request info",
      to: `/projects/${colnames.queryProjects.USER_REQUEST_INFO}`,
      action: () => store.dispatch(qp.changeQueryType(colnames.queryProjects.USER_REQUEST_INFO)),
    },{
      text: "Library info",
      to: `/projects/${colnames.queryProjects.LIBRARY_INFO}`,
      action: () => store.dispatch(qp.changeQueryType(colnames.queryProjects.LIBRARY_INFO)),
    },{
      text: "Sequencing details",
      to: `/projects/${colnames.queryProjects.SEQUENCING_DETAILS_INFO}`,
      action: () => store.dispatch(qp.changeQueryType(colnames.queryProjects.SEQUENCING_DETAILS_INFO)),
    },{
      text: "Samples sheet",
      to: `/projects/${colnames.queryProjects.SAMPLE_SHEETS_INFO}`,
      action: () => store.dispatch(qp.changeQueryType(colnames.queryProjects.SAMPLE_SHEETS_INFO)),
    },
    // {
    //  text: "IVC plots",
    //   to: `/projects/${colnames.queryProjects.IVC_PLOTS_INFO}`,
    //     action: () => store.dispatch(qp.changeQueryType(colnames.queryProjects.IVC_PLOTS)),
    // },
    {
      text: "Demultiplexings",
      to: `/projects/${colnames.queryProjects.DEMULTIPLEXING_INFO}`,
      action: () => store.dispatch(qp.changeQueryType(colnames.queryProjects.DEMULTIPLEXING_INFO)),
    },
    // {
    //   text: "Alignments (CASAVA)",
    //   to: `/projects/${colnames.queryProjects.ALIGNMENTS_INFO}`,
    //   action: () => store.dispatch(qp.changeQueryType(colnames.queryProjects.ALIGNMENTS_INFO)),
    // },
];

export const queryRunsSubmenu = [
    { text: "Sample material info",
      to: `/runs/${colnames.queryProjects.STARTING_MATERIAL_INFO}`,
      action: () => store.dispatch(qr.changeQueryType(colnames.queryProjects.STARTING_MATERIAL_INFO)),
    },{
      text: "User request info",
      to: `/runs/${colnames.queryProjects.USER_REQUEST_INFO}`,
        action: () => store.dispatch(qr.changeQueryType(colnames.queryProjects.USER_REQUEST_INFO)),
    },{
      text: "Library info",
      to: `/runs/${colnames.queryProjects.LIBRARY_INFO}`,
        action: () => store.dispatch(qr.changeQueryType(colnames.queryProjects.LIBRARY_INFO)),
    },{
      text: "Sequencing details",
      to: `/runs/${colnames.queryProjects.SEQUENCING_DETAILS_INFO}`,
        action: () => store.dispatch(qr.changeQueryType(colnames.queryProjects.SEQUENCING_DETAILS_INFO)),
    },{
      text: "Sample sheet",
      to: `/runs/${colnames.queryProjects.SAMPLE_SHEETS_INFO}`,
      action: () => store.dispatch(qr.changeQueryType(colnames.queryProjects.SAMPLE_SHEETS_INFO)),
    },{
    //   text: "IVC plots",
    //   to: `/runs/${colnames.queryProjects.IVC_PLOTS}`,
    //     action: () => store.dispatch(qr.changeQueryType(colnames.queryProjects.IVC_PLOTS)),
    // },{
      text: "Demultiplexing",
      to: `/runs/${colnames.queryProjects.DEMULTIPLEXING_INFO}`,
      action: () => store.dispatch(qr.changeQueryType(colnames.queryProjects.DEMULTIPLEXING_INFO)),
    },
    // { text: "Alignments (CASAVA)",
    //   to: `/runs/${colnames.queryProjects.ALIGNMENTS_INFO}`,
    // action: () => store.dispatch(qr.changeQueryType(colnames.queryProjects.ALIGNMENTS_INFO)),
    // }
];


export const adminSubmenu = [
    { text: "LIMS users",
      to: "/admin/users/list",
    },{
      text: "Project sharings",
      to: "/admin/project_sharings/list",
    },{
      text: "Analysis types",
      to: "/admin/analysis_types/list",
    },{
      text: "Flowcell types",
      to: "/admin/flowcell_types/list",
    },{
      text: "Instruments",
      to: "/admin/instruments/list",
    },{
      text: "Library adapters",
      to: "/admin/library_adapters/list",
    },{
      text: "Library protocols",
      to: "/admin/library_protocols/list",
    },{
      text: "Library states",
      to: "/admin/library_states/list",
    },{
      text: "Mapping tools",
      to: "/admin/mapping_tools/list",
    },{
      text: "Multiplex indexes",
      to: "/admin/multiplex_indexes/list",
    },{
      text: "Pipeline versions",
      to: "/admin/pipeline_versions/list",
    },{
      text: "Project analysis",
      to: "/admin/project_analysis/list",
    },{
      text: "Project states",
      to: "/admin/project_states/list",
    },{
      text: "Quantification methods",
      to: "/admin/quantif_methods/list",
    },{
      text: "Read lengths",
      to: "/admin/read_lengths/list",
    },{
      text: "Run types",
      to: "/admin/run_types/list",
    },{
      text: "Read lengths for run types",
      to: "/admin/run_types_lengths/list"
    },{
      text: "Sample types",
      to: "/admin/sample_types/list",
    },{
      text: "Sequencing kit versions",
      to: "/admin/sequencing_kit_versions/list",
    },{
      text: "Sequencing qualities",
      to: "/admin/sequencing_qualities/list",
    },{
      text: "Taxonomies",
      to: "/admin/taxonomies/list",
    }
];