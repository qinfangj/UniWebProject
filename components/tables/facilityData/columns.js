import * as format from '../formatters';
import { CENTER, ID_COLUMN } from '../constants';


const columns = {
    projects: [
        ID_COLUMN,
        {
            headerName: "Name",
            field: "name",
        },{
            headerName: "Code",
            field: "code_name",
        },{
            headerName: "Description",
            field: "description",
        },{
            headerName: "Author",
            field: "author",
        },
    ],
    people: [
        ID_COLUMN,
        {
            headerName: "PI name",
            field: "name",
        },{
            headerName: "Address",
            field: "address",
        },{
            headerName: "PI email",
            field: "email",
        }
    ],
    genomes: [
        ID_COLUMN,
        {
            headerName: "Organism",
            field: "organism",
        },{
            headerName: "Assembly",
            field: "assembly",
        },{
            headerName: "Masked",
            field: "is_masked",
            cellRenderer: format.boolean,
            cellStyle: CENTER,
        },{
            headerName: "Download date",
            field: "downloaded_date",
            //cellRenderer: format.date,
        },{
            headerName: "Folder",
            field: "genome_folder",
        },
    ],
    samples: [
        ID_COLUMN,
        {
            headerName: "Short name",
            field: "short_name",
        },{
            headerName: "Name",
            field: "name",
        },{
            headerName: "Received date",
            field: "received_date",
            //cellRenderer: format.date,
        },{
            headerName: "Type",
            field: "sample_type",
        },{
            headerName: "Organism",
            field: "organism",
        },{
            headerName: "Project",
            field: "project",
        },{
            headerName: "Lab",
            field: "laboratory",
        },
    ],
    libraries: [
        ID_COLUMN,
        {
            headerName: "Name",
            field: "name",
        },{
            headerName: "Protocol",
            field: "protocol",
        },{
            headerName: "Date",
            field: "library_date",
            //cellRenderer: format.date,
        },{
            headerName: "Index",
            field: "multiplex_index",
        },{
            headerName: "Submitted as library",
            field: "isCustomer_made",
            cellRenderer: format.boolean,
            cellStyle: CENTER,
        },{
            headerName: "Project",
            field: "project",
        },{
            headerName: "Laboratory",
            field: "laboratory",
        },{
            headerName: "Made on robot",
            field: "isRobot_made",
            cellRenderer: format.boolean,
            cellStyle: CENTER,
        },
    ],
    runs: [
        ID_COLUMN,
        {
            headerName: "Run folder",
            field: "run_folder",
        },{
            headerName: "Cycle Nb",
            field: "cycle_nb",
            cellStyle: CENTER,
        },{
            headerName: "Run type",
            field: "run_type",
            cellStyle: CENTER,
        },{
            headerName: "Run date",
            field: "run_date",
        },{
            headerName: "Release date",
            field: "release_date",
            //cellRenderer: format.date,
        },{
            headerName: "Status",
            field: "status",
            cellStyle: CENTER,
        },
    ],
    user_requests: [
        ID_COLUMN,
        {
            headerName: "Sample",
            field: "sample",
        },{
            headerName: "Laboratory",
            field: "laboratory",
        },{
            headerName: "Library",
            field: "library",
        },{
            headerName: "Run type",
            field: "run_type",
        },{
            headerName: "Read length",
            field: "read_length",
        },{
            headerName: "Nb lanes",
            field: "nb_lanes",
        },{
            headerName: "Multiplex#",
            field: "multiplex_nb",
        },{
            headerName: "Group",
            field: "group",
        },{
            headerName: "Submitter",
            field: "submitter",
        },
    ],
    bioanalysers: [
        ID_COLUMN,
        {
            headerName: "Date",
            field: "bioanalyser_date",
        },
        {
            headerName: "File name",
            field: "filename",
        },
    ],
    basecallings: [
        ID_COLUMN,
        {
            headerName: "Run folder",
            field: "run_folder",
        },{
            headerName: "FASTQ path",
            field: "fastq_path",
        },{
            headerName: "Software",
            field: "software",
        },{
            headerName: "Version",
            field: "version",
            cellStyle: CENTER,
            width: 90,
        },{
            headerName: "Analysis type",
            field: "analysis_type",
        },
    ],
    alignments: [
        ID_COLUMN,
        {
            headerName: "Run folder",
            field: "run_folder",
        },{
            headerName: "Alignment path",
            field: "alignment_path",
        },{
            headerName: "Analysis type",
            field: "analysis_type",
        },{
            headerName: "Eland version",
            field: "eland_version",
        },
    ],
};


export default columns;