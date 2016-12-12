import * as formatters from '../formatters';
import { CENTER, ID_COLUMN } from '../constants';


const columns = {
    starting_material: [
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

    "user_request": [
        {
            headerName: "Sample",
            field: "samples_short_name",
        },{
            headerName: "Library",
            field: "protocol",
        },{
            headerName: "Insert size",
            field: "insert_size",    // formatted from min + max
        },{
            headerName: "Multiplex group",
            field: "multiplexing_group",
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
        },{
            headerName: "Status",
            field: "status",   // formatted from isFulfilled
        },
        // "comment" is available only when "Show comments" is toggled on. Add it on the fly.
    ],

    "library": [
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
        },{
            headerName: "Conc. [ng/μl]",
            field: "concentration",
        // Conc. updated by ?
        },{
            headerName: "Method",
            field: "quantif_method",
        },{
            headerName: "Vol [μl]",
            field: "volume",
        },{
            headerName: "Project",
            field: "project_name",
        },{
            headerName: "Lab",
            field: "pi_last_name",
        },
        // "comment" is available only when "Show comments" is toggled on. Add it on the fly.
    ]
};


export default columns;