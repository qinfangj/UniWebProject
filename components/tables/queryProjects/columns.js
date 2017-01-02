import * as formatters from '../formatters';
import { CENTER } from '../constants';
import columnNames from '../../constants/columns';


const col = columnNames.queryProjects;

const columns = {
    [col.STARTING_MATERIAL_INFO]: [
        {
            headerName: "ID",
            field: "sample_id",
            width: 40,
            suppressSizeToFit: true,
            suppressMenu: true,
            cellStyle: CENTER,
        },{
            headerName: "Sample",
            field: "sample_short_name",
        },{
            headerName: "Name",
            field: "sample_name",
        },{
            headerName: "Organism",
            field: "organism",
        },{
            headerName: "Type",
            field: "sample_type",
        },{
            headerName: "Conc. [ng/μl]",
            field: "concentration",
        },{
            headerName: "Vol. [μl]",
            field: "volume",
        },{
            headerName: "Ratio 260/280",
            field: "ratio_260_280",
            cellRenderer: formatters.nullable
        },{
            headerName: "Ratio 260/230",
            field: "ratio_260_230",
            cellRenderer: formatters.nullable
        },{
            headerName: "RIN",
            field: "rin",
            cellRenderer: formatters.nullable
        },{
            headerName: "Method",
            field: "quantif_method",
        },{
            headerName: "Project",
            field: "project_name",
        },{
            headerName: "Lab",
            field: "pi_last_name",
        },{
            headerName: "Submitter",
            field: "submitter",           // formatted from first name + last name
            cellRenderer: formatters.nullable
        }
    ],

    [col.USER_REQUEST_INFO]: [
        {
            headerName: "Sample",
            field: "samples_short_name",
        },{
            headerName: "Library",
            field: "protocol",
        },{
            headerName: "Insert size",
            field: "insert_size",    // formatted from min + max
            cellRenderer: formatters.nullable
        },{
            headerName: "Multiplex group",
            field: "multiplexing_group",
            cellRenderer: formatters.nullable
        },{
            headerName: "Run type",
            field: "run_type",
        },{
            headerName: "Nb lanes",
            field: "nb_lanes",
        },{
            headerName: "Multiplex #",
            field: "lane_fraction",
        },{
            headerName: "Project",
            field: "project_name",
        },{
            headerName: "Lab",
            field: "pi_last_name",
        },{
            headerName: "Submitter",
            field: "submitter",   // formatted from first name + last name
            cellRenderer: formatters.nullable
        },{
            headerName: "Status",
            field: "status",   // formatted from isFulfilled
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
        },{
            headerName: "I7 index",
            field: "multiplex_index",
        },{
            headerName: "I5 index",
            field: "index5p",
        },{
            headerName: "Protocol",
            field: "lib_protocol",
        },{
            headerName: "On robot",
            field: "isRobot_made",
        },{
            headerName: "Insert size",
            field: "bioanalyser_peak",   // ??
            cellRenderer: formatters.nullable
        },{
            headerName: "Conc. [ng/μl]",
            field: "concentration",
            cellRenderer: formatters.nullable
// Conc. updated by ?
        },{
            headerName: "Method",
            field: "quantif_method",
        },{
            headerName: "Vol [μl]",
            field: "volume",
            cellRenderer: formatters.nullable
        },{
            headerName: "Project",
            field: "project_name",
        },{
            headerName: "Lab",
            field: "pi_last_name",
        },
        // "comment" is available only when "Show comments" is toggled on. Add it on the fly.
        // "commentCustomer" is here, too.
    ],

    [col.SEQUENCING_DETAILS_INFO]: [
        {
            headerName: "Machine",
            field: "instrument",
        },{
            headerName: "Date",
            field: "ga_run_date",
        },{
            headerName: "Run",
            field: "ga_run_nb",
        },{
            headerName: "Cycles",
            field: "read_length",
        },{
            headerName: "Lane",
            field: "lane_nb",
        },{
            headerName: "Library",
            field: "library",
        },{
            headerName: "Adapter",
            field: "adapter",
        },{
            headerName: "Protocol",
            field: "protocol",
        },{
            headerName: "Organism",
            field: "organism",
        },{
            headerName: "Project",
            field: "project",
        },{
            headerName: "Lab",
            field: "pi_last_name",  // formatted from PI first name + last name
        },{
            headerName: "Submitter",
            field: "submitter",  // formatted from submitter first name + last name
            cellRenderer: formatters.nullable
        },
    ],

    [col.SAMPLE_SHEETS_INFO]: [
        {
            headerName: "FCID",
            field: "ref_name",
        },{
            headerName: "Lane",
            field: "lane_nb",
        },{
            headerName: "SampleID",
            field: "library_name",
        },{
            headerName: "SampleRef",
            field: "organism",
        },{
            headerName: "Index",
            field: "multiplexing_index",  // formatted from both indexes
            cellRenderer: formatters.nullable
        },{
            headerName: "Description",
            field: "sample_name",
        },{
            headerName: "Control",
            field: "project_isControl",
        },{
            headerName: "Recipe",
            field: "recipe",        // ???
        },{
            headerName: "Operator",
            field: "run_created_by",
            cellRenderer: formatters.nullable
        },{
            headerName: "Project",
            field: "project_code_name",
        },
    ],

    [col.DEMULTIPLEXING_INFO]: [
        {
            headerName: "Library",
            field: "library",
        },{
            headerName: "Run",
            field: "run",   // formatted from instrument + ga_run_nb + lane_nb
        },{
            headerName: "GAP",
            field: "pipeline_version",  // ?
        },{
            headerName: "Lane Yield",
            field: "bc_lane_yield",
        },{
            headerName: "Raw Clusters#",
            field: "bc_raw_clusters_nb",
        },{
            headerName: "% PF Clusters",
            field: "bc_pc_pf_clusters",
        },{
            headerName: "% Q30 PF",
            field: "bc_pc_q30_pf",
            cellRenderer: formatters.nullable
        },{
            headerName: "Mean Score PF",
            field: "bc_mean_score_pf",
            cellRenderer: formatters.nullable
        },{
            headerName: "% Perfect Index",
            field: "bc_pc_perfect_index",
            cellRenderer: formatters.nullable
        },{
            headerName: "% 1MM Index",
            field: "bc_pc_one_mismatch_index",
            cellRenderer: formatters.nullable
        },
    ],

    [col.ALIGNMENTS_INFO]: [
        // 3 tables
    ],
};


export default columns;