"use strict";
import React from 'react';
import * as formatters from '../formatters';
import tableNames from '../../constants/tableNames';
import { CENTER, ID_COLUMN } from '../columns';



const facilityDataColumns = {
    [tableNames.PROJECTS]: [
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
    [tableNames.PEOPLE]: [
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
    [tableNames.GENOMES]: [
        ID_COLUMN,
        {
            headerName: "Organism",
            field: "organism",
        },{
            headerName: "Assembly",
            field: "assembly",
        },{
            headerName: "Download date",
            field: "downloaded_date",
            //cellRenderer: formatters.date,
        },{
            headerName: "Folder",
            field: "genome_folder",
        },
    ],
    [tableNames.SAMPLES]: [
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
            //cellRenderer: formatters.date,
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
    [tableNames.LIBRARIES]: [
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
            //cellRenderer: formatters.date,
        },{
            headerName: "Index",
            field: "multiplex_index",
        },{
            headerName: "Submitted as library",
            field: "isCustomer_made",
            cellRenderer: formatters.boolean,
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
            cellRenderer: formatters.boolean,
            cellStyle: CENTER,
        },
    ],
    [tableNames.RUNS]: [
        ID_COLUMN,
        {
            headerName: "Run folder",
            field: "run_folder",
        },{
            headerName: "Cycle Nb",
            field: "read_length",
            cellStyle: CENTER,
        },{
            headerName: "Run type",
            field: "run_type",
            cellStyle: CENTER,
        },{
            headerName: "Run date",
            field: "ga_run_date",
        },{
            headerName: "Release date",
            field: "release_date",
            //cellRenderer: formatters.date,
        },{
            headerName: "Status",
            field: "status",
            cellStyle: CENTER,
        },
    ],
    [tableNames.USER_REQUESTS]: [
        ID_COLUMN,
        {
            headerName: "Sample",
            field: "sample",
        },{
            headerName: "Laboratory",
            field: "laboratory",
        },{
            headerName: "Library",
            field: "library_protocol",
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
            field: "lane_fraction",
        },{
            headerName: "Group",
            field: "multiplexing_group",
        },{
            headerName: "Submitter",
            field: "submitter",
        },
    ],
    [tableNames.BIOANALYSERS]: [
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
    [tableNames.BASECALLINGS]: [
        ID_COLUMN,
        {
            headerName: "Run folder",
            field: "run_folder",
        },{
            headerName: "FASTQ path",
            field: "fastq_path",
        },{
            headerName: "Software",
            field: "software_name",
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
    [tableNames.ALIGNMENTS]: [
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


export default facilityDataColumns;
