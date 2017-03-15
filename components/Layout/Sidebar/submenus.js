"use strict";

import colnames from '../../constants/columns';


export const facilityDataSubmenu = [
    { text: "Laboratories", to: "/data/people", },
    { text: "Projects", to: "/data/projects", },
    { text: "Samples", to: "/data/samples", },
    { text: "User requests", to: "/data/user_requests", },
    { text: "Libraries", to: "/data/libraries", },
    { text: "Bioanalysers", to: "/data/bioanalysers", },
    { text: "Runs", to: "/data/runs" },
    { text: "Base callings / demultiplexings", to: "/data/basecallings", },
    { text: "Alignments / QC", to: "/data/alignments", },
    { text: "Genomes", to: "/data/genomes", },
];

export const queryProjectsSubmenu = [
    { text: "Sample material info",
      to: `/projects/${colnames.queryProjects.STARTING_MATERIAL_INFO}`,
    },{
      text: "User request info",
      to: `/projects/${colnames.queryProjects.USER_REQUEST_INFO}`,
    },{
      text: "Library info",
      to: `/projects/${colnames.queryProjects.LIBRARY_INFO}`,
    },{
      text: "Sequencing details",
      to: `/projects/${colnames.queryProjects.SEQUENCING_DETAILS_INFO}`,
    },{
      text: "Samples sheet",
      to: `/projects/${colnames.queryProjects.SAMPLE_SHEETS_INFO}`,
    },{
    //{ text: "IVC plots",
    //   to: `/projects/${col.IVC_PLOTS}`,
    //},
      text: "Demultiplexings",
      to: `/projects/${colnames.queryProjects.DEMULTIPLEXING_INFO}`,
    },
    //{ text: "Alignments (CASAVA)",
    //   to: `/projects/${col.ALIGNMENTS_INFO}`,
    //},
];


export const adminSubmenu = [
    { text: "LIMS users",
      to: "/admin/users",
    },{
      text: "Project sharings",
      to: "/admin/project_sharings",
    },{
      text: "Analysis types",
      to: "/admin/analysis_types/new",
    },{
      text: "Flowcell types",
      to: "/admin/flowcell_types/new",
    },{
      text: "Instruments",
      to: "/admin/instruments/new",
    },{
      text: "Library adapters",
      to: "/admin/library_adapters/new",
    },{
      text: "Library protocols",
      to: "/admin/library_protocols/new",
    },{
      text: "Library states",
      to: "/admin/library_states/new",
    },{
      text: "Mapping tools",
      to: "/admin/mapping_tools/new",
    },{
      text: "Multiplex indexes",
      to: "/admin/multiplex_indexes/new",
    },{
      text: "Pipeline versions",
      to: "/admin/pipeline_versions/new",
    },{
      text: "Project analysis",
      to: "/admin/project_analysis/new",
    },{
      text: "Project states",
      to: "/admin/project_states/new",
    },{
      text: "Quantification methods",
      to: "/admin/quantif_methods/new",
    },{
      text: "Read lengths",
      to: "/admin/read_lengths/new",
    },{
      text: "Run types",
      to: "/admin/run_types/new",
    },{
      text: "Read lengths for run types",
      to: "/admin/run_types_lengths/new"
    },{
      text: "Sample types",
      to: "/admin/sample_types/new",
    },{
      text: "Sequencing kit versions",
      to: "/admin/sequencing_kit_versions/new",
    },{
      text: "Sequencing qualities",
      to: "/admin/sequencing_qualities/new",
    },{
      text: "Taxonomies",
      to: "/admin/taxonomies/new",
    }
];