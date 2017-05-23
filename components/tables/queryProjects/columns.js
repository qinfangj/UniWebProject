"use strict";
import * as formatters from '../formatters';
import { CENTER, MULTIROW } from '../constants';
import columnNames from '../../constants/columns';


const col = columnNames.queryProjects;


const columns = {
    [col.STARTING_MATERIAL_INFO]: [
        {
            headerName: "ID",
            field: "sample_id",
            width: 70,
            suppressSizeToFit: true,
            suppressMenu: true,
            cellStyle: CENTER,
        },{
            headerName: "Sample",
            field: "sample_short_name",
        },{
            headerName: "Name",
            field: "sample_name",
            cellStyle: MULTIROW,
        },{
            headerName: "Organism",
            field: "organism",
            cellStyle: MULTIROW,
        },{
            headerName: "Type",
            field: "sample_type",
            cellStyle: MULTIROW,
        },{
            headerName: "Conc. [ng/μl]",
            field: "concentration",
            cellRenderer: formatters.clipFloat,
            cellStyle: MULTIROW,
        },{
            headerName: "Vol. [μl]",
            field: "volume",
            cellRenderer: formatters.clipFloat,
            cellStyle: MULTIROW,
        },{
            headerName: "Ratio 260/280",
            field: "ratio_260_280",
            cellRenderer: formatters.clipFloat,
            cellStyle: MULTIROW,
        },{
            headerName: "Ratio 260/230",
            field: "ratio_260_230",
            cellRenderer: formatters.clipFloat,
            cellStyle: MULTIROW,
        },{
            headerName: "RIN",
            field: "rin",
            cellRenderer: formatters.clipFloat,
            cellStyle: MULTIROW,
        },{
            headerName: "Method",
            field: "quantif_method",
            cellStyle: MULTIROW,
        },{
            headerName: "Project",
            field: "project_name",
            cellStyle: MULTIROW,
        },{
            headerName: "Lab",
            field: "pi_last_name",
            cellStyle: MULTIROW,
        },{
            headerName: "Submitter",
            field: "submitter",           // formatted from first name + last name
            cellRenderer: formatters.nullable,
            cellStyle: MULTIROW,
        }
    ],

    [col.USER_REQUEST_INFO]: [
        {
            headerName: "Sample",
            field: "samples_short_name",
            cellStyle: MULTIROW,
        },{
            headerName: "Library",
            field: "protocol",
            cellStyle: MULTIROW,
        },{
            headerName: "Insert size",
            field: "insert_size",    // formatted from min + max
            cellRenderer: formatters.nullable,
            cellStyle: MULTIROW,
        },{
            headerName: "Multiplex group",
            field: "multiplexing_group",
            cellRenderer: formatters.nullable,
            cellStyle: MULTIROW,
        },{
            headerName: "Run type",
            field: "run_type",
            cellStyle: MULTIROW,
        },{
            headerName: "Nb lanes",
            field: "nb_lanes",
        },{
            headerName: "Multiplex #",
            field: "lane_fraction",
        },{
            headerName: "Project",
            field: "project_name",
            cellStyle: MULTIROW,
        },{
            headerName: "Lab",
            field: "pi_last_name",
            cellStyle: MULTIROW,
        },{
            headerName: "Submitter",
            field: "submitter",   // formatted from first name + last name
            cellRenderer: formatters.nullable,
            cellStyle: MULTIROW,
        },{
            headerName: "Status",
            field: "status",   // formatted from isFulfilled
            cellStyle: MULTIROW,
        },
        // "comment" is available only when "Show comments" is toggled on. Add it on the fly.
    ],

    [col.LIBRARY_INFO]: [
        {
            headerName: "ID",
            field: "library_id",
            width: 40,
            suppressSizeToFit: true,
            suppressMenu: true,
            cellStyle: CENTER,
        },{
            headerName: "Library",
            field: "library_name",
            cellStyle: MULTIROW,
        },{
            headerName: "I7 index",
            field: "multiplex_index",
            cellStyle: MULTIROW,
        },{
            headerName: "I5 index",
            field: "index5p",
            cellStyle: MULTIROW,
        },{
            headerName: "Protocol",
            field: "lib_protocol",
            cellStyle: MULTIROW,
        },{
            headerName: "On robot",
            field: "isRobot_made",
        },{
            headerName: "Insert size",
            field: "bioanalyser_peak",   // ??
            cellRenderer: formatters.nullable,
        },{
            headerName: "Conc. [ng/μl]",
            field: "concentration",
            cellRenderer: formatters.clipFloat,
            cellStyle: MULTIROW,
// Conc. updated by ?
        },{
            headerName: "Method",
            field: "quantif_method",
            cellStyle: MULTIROW,
        },{
            headerName: "Vol [μl]",
            field: "volume",
            cellRenderer: formatters.clipFloat,
            cellStyle: MULTIROW,
        },{
            headerName: "Project",
            field: "project_name",
            cellStyle: MULTIROW,
        },{
            headerName: "Lab",
            field: "pi_last_name",
            cellStyle: MULTIROW,
        },
        // "comment" is available only when "Show comments" is toggled on. Add it on the fly.
        // "commentCustomer" is here, too.
    ],

    [col.SEQUENCING_DETAILS_INFO]: [
        {
            headerName: "Machine",
            field: "instrument",
            cellStyle: MULTIROW,
        },{
            headerName: "Date",
            field: "ga_run_date",
            cellStyle: MULTIROW,
        },{
            headerName: "Run",
            field: "ga_run_nb",
            cellStyle: MULTIROW,
        },{
            headerName: "Cycles",
            field: "read_length",
        },{
            headerName: "Lane",
            field: "lane_nb",
        },{
            headerName: "Library",
            field: "library",
            cellStyle: MULTIROW,
        },{
            headerName: "Adapter",
            field: "adapter",
            cellStyle: MULTIROW,
        },{
            headerName: "Protocol",
            field: "protocol",
            cellStyle: MULTIROW,
        },{
            headerName: "Organism",
            field: "organism",
            cellStyle: MULTIROW,
        },{
            headerName: "Project",
            field: "project",
            cellStyle: MULTIROW,
        },{
            headerName: "Lab",
            field: "pi_last_name",  // formatted from PI first name + last name
            cellStyle: MULTIROW,
        },{
            headerName: "Submitter",
            field: "submitter",  // formatted from submitter first name + last name
            cellRenderer: formatters.nullable,
            cellStyle: MULTIROW,
        },
    ],

    [col.SAMPLE_SHEETS_INFO]: [
        {
            headerName: "FCID",
            field: "ref_name",
            cellStyle: MULTIROW,
        },{
            headerName: "Lane",
            field: "lane_nb",
        },{
            headerName: "SampleID",
            field: "library_name",
            cellStyle: MULTIROW,
        },{
            headerName: "SampleRef",
            field: "organism",
            cellStyle: MULTIROW,
        },{
            headerName: "Index",
            field: "multiplexing_index",  // formatted from both indexes
            cellRenderer: formatters.nullable,
            cellStyle: MULTIROW,
        },{
            headerName: "Description",
            field: "sample_name",
            cellStyle: MULTIROW,
        },{
            headerName: "Control",
            field: "project_isControl",
        },{
            headerName: "Recipe",
            field: "recipe",        // ???
            cellStyle: MULTIROW,
        },{
            headerName: "Operator",
            field: "run_created_by",
            cellRenderer: formatters.nullable,
            cellStyle: MULTIROW,
        },{
            headerName: "Project",
            field: "project_code_name",
            cellStyle: MULTIROW,
        },
    ],

    [col.DEMULTIPLEXING_INFO]: [
        {
            headerName: "Library",
            field: "library",
            cellStyle: MULTIROW,
        },{
            headerName: "Run",
            field: "run",   // formatted from instrument + ga_run_nb + lane_nb
            cellStyle: MULTIROW,
        },{
            headerName: "GAP",
            field: "pipeline_version",  // ?
            cellStyle: MULTIROW,
        },{
            headerName: "Lane Yield",
            field: "bc_lane_yield",
            cellStyle: MULTIROW,
        },{
            headerName: "Raw Clusters#",
            field: "bc_raw_clusters_nb",
            cellStyle: MULTIROW,
        },{
            headerName: "% PF Clusters",
            field: "bc_pc_pf_clusters",
            cellStyle: MULTIROW,
        },{
            headerName: "% Q30 PF",
            field: "bc_pc_q30_pf",
            cellRenderer: formatters.nullable,
            cellStyle: MULTIROW,
        },{
            headerName: "Mean Score PF",
            field: "bc_mean_score_pf",
            cellRenderer: formatters.nullable,
            cellStyle: MULTIROW,
        },{
            headerName: "% Perfect Index",
            field: "bc_pc_perfect_index",
            cellRenderer: formatters.nullable,
            cellStyle: MULTIROW,
        },{
            headerName: "% 1MM Index",
            field: "bc_pc_one_mismatch_index",
            cellRenderer: formatters.nullable,
            cellStyle: MULTIROW,
        },
    ],

    [col.ALIGNMENTS_INFO]: [
        // 3 tables
    ],
};


export default columns;