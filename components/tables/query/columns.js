"use strict";
import * as formatters from '../formatters';
import { CENTER } from '../columns';
import columnNames from '../../constants/columns';


const col = columnNames.queryProjects;


const columns = {
    [col.STARTING_MATERIAL_INFO]: [
        {
            headerName: "ID",
            field: "sample_id",
            width: 70,
        },{
            headerName: "Sample",
            field: "sample_short_name",
            width: 100,
        },{
            headerName: "Name",
            field: "sample_name",
            width: 100,
        },{
            headerName: "Organism",
            field: "organism",
            width: 100,
        },{
            headerName: "Type",
            field: "sample_type",
            width: 100,
        },{
            headerName: "Conc. [ng/μl]",
            field: "concentration",
            width: 100,
            cellRenderer: formatters.clipFloat,
        },{
            headerName: "Vol. [μl]",
            field: "volume",
            width: 100,
            cellRenderer: formatters.clipFloat,
        },{
            headerName: "Ratio 260/280",
            field: "ratio_260_280",
            width: 120,
            cellRenderer: formatters.clipFloat,
        },{
            headerName: "Ratio 260/230",
            field: "ratio_260_230",
            width: 120,
            cellRenderer: formatters.clipFloat,
        },{
            headerName: "RIN",
            field: "rin",
            width: 100,
            cellRenderer: formatters.clipFloat,
        },{
            headerName: "Method",
            field: "quantif_method",
            width: 100,
        },{
            headerName: "Project",
            field: "project_name",
            width: 100,
        },{
            headerName: "Lab",
            field: "pi_last_name",
            width: 100,
        },{
            headerName: "Submitter",
            field: "submitter",           // formatted from first name + last name
            width: 100,
            cellRenderer: formatters.nullable,
        }
    ],

    [col.USER_REQUEST_INFO]: [
        {
            headerName: "Sample",
            field: "samples_short_name",
            width: 100,
        },{
            headerName: "Library",
            field: "protocol",
            width: 100,
        },{
            headerName: "Insert size",
            field: "insert_size",    // formatted from min + max
            width: 100,
            cellRenderer: formatters.nullable,
        },{
            headerName: "Multiplex group",
            field: "multiplexing_group",
            width: 100,
            cellRenderer: formatters.nullable,
        },{
            headerName: "Run type",
            field: "run_type",
            width: 100,
        },{
            headerName: "Nb lanes",
            field: "nb_lanes",
            width: 100,
        },{
            headerName: "Multiplex #",
            field: "lane_fraction",
            width: 100,
        },{
            headerName: "Project",
            field: "project_name",
            width: 100,
        },{
            headerName: "Lab",
            field: "pi_last_name",
            width: 100,
        },{
            headerName: "Submitter",
            field: "submitter",   // formatted from first name + last name
            width: 100,
            cellRenderer: formatters.nullable,
        },{
            headerName: "Status",
            field: "status",   // formatted from isFulfilled
            width: 100,
        },
        // "comment" is available only when "Show comments" is toggled on. Add it on the fly.
    ],

    [col.LIBRARY_INFO]: [
        {
            headerName: "ID",
            field: "library_id",
            width: 70,
        },{
            headerName: "Library",
            field: "library_name",
            width: 100,
        },{
            headerName: "I7 index",
            field: "multiplex_index",
            width: 100,
        },{
            headerName: "I5 index",
            field: "index5p",
            width: 100,
        },{
            headerName: "Protocol",
            field: "lib_protocol",
            width: 100,
        },{
            headerName: "On robot",
            field: "isRobot_made",
            width: 100,
        },{
            headerName: "Insert size",
            field: "bioanalyser_peak",   // ??
            width: 100,
            cellRenderer: formatters.nullable,
        },{
            headerName: "Conc. [ng/μl]",
            field: "concentration",
            width: 100,
            cellRenderer: formatters.clipFloat,
// Conc. updated by ?
        },{
            headerName: "Method",
            field: "quantif_method",
            width: 100,
        },{
            headerName: "Vol [μl]",
            field: "volume",
            width: 100,
            cellRenderer: formatters.clipFloat,
        },{
            headerName: "Project",
            field: "project_name",
            width: 100,
        },{
            headerName: "Lab",
            field: "pi_last_name",
            width: 100,
        },
        // "comment" is available only when "Show comments" is toggled on. Add it on the fly.
        // "commentCustomer" is here, too.
    ],

    [col.SEQUENCING_DETAILS_INFO]: [
        {
            headerName: "Machine",
            field: "instrument",
            width: 100,
        },{
            headerName: "Date",
            field: "ga_run_date",
            width: 100,
        },{
            headerName: "Run",
            field: "ga_run_nb",
            width: 100,
        },{
            headerName: "Cycles",
            field: "read_length",
            width: 100,
        },{
            headerName: "Lane",
            field: "lane_nb",
            width: 100,
        },{
            headerName: "Library",
            field: "library",
            width: 100,
        },{
            headerName: "Adapter",
            field: "adapter",
            width: 100,
        },{
            headerName: "Protocol",
            field: "protocol",
            width: 100,
        },{
            headerName: "Organism",
            field: "organism",
            width: 100,
        },{
            headerName: "Project",
            field: "project",
            width: 100,
        },{
            headerName: "Lab",
            field: "pi_last_name",  // formatted from PI first name + last name
            width: 100,
        },{
            headerName: "Submitter",
            field: "submitter",  // formatted from submitter first name + last name
            width: 100,
            cellRenderer: formatters.nullable,
        },
    ],

    [col.SAMPLE_SHEETS_INFO]: [
        {
            headerName: "FCID",
            field: "ref_name",
            width: 100,
        },{
            headerName: "Lane",
            field: "lane_nb",
            width: 100,
        },{
            headerName: "SampleID",
            field: "library_name",
            width: 100,
        },{
            headerName: "SampleRef",
            field: "organism",
            width: 100,
        },{
            headerName: "Index",
            field: "multiplexing_index",  // formatted from both indexes
            width: 100,
            cellRenderer: formatters.nullable,
        },{
            headerName: "Description",
            field: "sample_name",
            width: 100,
        },{
            headerName: "Control",
            field: "project_isControl",
            width: 100,
        },{
            headerName: "Recipe",
            field: "recipe",        // ???
            width: 100,
        },{
            headerName: "Operator",
            field: "run_created_by",
            width: 100,
            cellRenderer: formatters.nullable,
        },{
            headerName: "Project",
            field: "project_code_name",
            width: 100,
        },
    ],

    [col.DEMULTIPLEXING_INFO]: [
        {
            headerName: "Library",
            field: "library",
            width: 100,
        },{
            headerName: "Run",
            field: "run",   // formatted from instrument + ga_run_nb + lane_nb
            width: 100,
        },{
            headerName: "GAP",
            field: "pipeline_version",  // ?
            width: 100,
        },{
            headerName: "Lane Yield",
            field: "bc_lane_yield",
            width: 100,
        },{
            headerName: "Raw Clusters#",
            field: "bc_raw_clusters_nb",
            width: 100,
        },{
            headerName: "% PF Clusters",
            field: "bc_pc_pf_clusters",
            width: 100,
        },{
            headerName: "% Q30 PF",
            field: "bc_pc_q30_pf",
            width: 100,
            cellRenderer: formatters.nullable,
        },{
            headerName: "Mean Score PF",
            field: "bc_mean_score_pf",
            width: 100,
            cellRenderer: formatters.nullable,
        },{
            headerName: "% Perfect Index",
            field: "bc_pc_perfect_index",
            width: 100,
            cellRenderer: formatters.nullable,
        },{
            headerName: "% 1MM Index",
            field: "bc_pc_one_mismatch_index",
            width: 100,
            cellRenderer: formatters.nullable,
        },
    ],
    [col.IVC_PLOTS_INFO]: [
        {
            headerName: "",
            field: "name",
            width: 100,
        },{
            headerName: "All",
            field: "all",
            width: 100,
            cellRenderer: function(params) {
                //var img = "<img src='./temp/" + params.value + ".png' width = '100px' height= '100px' >";
                let imgName =  params.value + ".png";
                //
                let img = '<div style = "background:url(./temp/' + imgName + '); height:100px;"  ></div>';
                return img

            }
            // cellRenderer: function(params) {
            //     return '<span style="color: red">' + params.value + '</span>';}
        },{
            headerName: "Called",
            field: "called",
            width: 100,
        },{
            headerName: "% Base Calls",
            field: "percentBaseCalls",
            width: 100,
        },{
            headerName: "% All",
            field: "percentAll",
            width: 100,
        },{
            headerName: "% Called",
            field: "percentCalled",
            width: 100,
        },
    ],

    [col.ALIGNMENTS_INFO]: [
        // 3 tables
    ],
};


export default columns;