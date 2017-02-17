"use strict";

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


import store from '../../../core/store';
import columnNames from '../../constants/columns';
import { changeQueryProjectsType } from '../../actions/actionCreators/queryProjectsActionCreators';
let col = columnNames.queryProjects;
let changeQueryType = (type) => store.dispatch(changeQueryProjectsType(type));


export const queryProjectsSubmenu = [
    { text: "Sample material info",
      to: "/projects/sample",
      action: () => changeQueryType(col.STARTING_MATERIAL_INFO) },
    { text: "User request info",
      to: "/projects/request",
      action: () => changeQueryType(col.USER_REQUEST_INFO) },
    { text: "Library info",
      to: "/projects/library",
      action: () => changeQueryType(col.LIBRARY_INFO) },
    { text: "Sequencing details",
      to: "/projects/desc",
      action: () => changeQueryType(col.SEQUENCING_DETAILS_INFO) },
    { text: "Samples sheet",
      to: "/projects/sheet",
      action: () => changeQueryType(col.SAMPLE_SHEETS_INFO) },
    //{ text: "IVC plots",
    //   to: "/projects/ivc",
    // action: () => changeQueryType(col.IVC_PLOTS) },
    { text: "Demultiplexings",
      to: "/projects/demultiplexing",
      action: () => changeQueryType(col.DEMULTIPLEXING_INFO) },
    //{ text: "Alignments (CASAVA)",
    //   to: "/projects/alignments",
    // action: changeQueryType(col.ALIGNMENTS_INFO) },
];