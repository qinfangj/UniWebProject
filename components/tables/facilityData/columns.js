"use strict";
import React from 'react';
import * as formatters from '../formatters';
import { CENTER } from '../constants';
import tableNames from '../tableNames';
import { idColumnWithUpdateLink } from '../columns';



const facilityDataColumns = {
    [tableNames.PROJECTS]: [
        idColumnWithUpdateLink("projects", "data"),
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
        idColumnWithUpdateLink("people", "data"),
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
        idColumnWithUpdateLink("genomes", "data"),
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
        idColumnWithUpdateLink("samples", "data"),
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
        idColumnWithUpdateLink("libraries", "data"),
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
        idColumnWithUpdateLink("runs", "data"),
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
            //cellRenderer: formatters.date,
        },{
            headerName: "Status",
            field: "status",
            cellStyle: CENTER,
        },
    ],
    [tableNames.USER_REQUESTS]: [
        idColumnWithUpdateLink("user_requests", "data"),
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
            field: "lane_fraction",
        },{
            headerName: "Group",
            field: "group",
        },{
            headerName: "Submitter",
            field: "submitter",
        },
    ],
    [tableNames.BIOANALYSERS]: [
        idColumnWithUpdateLink("bioanalysers", "data"),
        {
            headerName: "Date",
            field: "date",
        },
        {
            headerName: "File name",
            field: "filename",
        },
    ],
    [tableNames.BASECALLINGS]: [
        idColumnWithUpdateLink("basecallings", "data"),
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
    [tableNames.ALIGNMENTS]: [
        idColumnWithUpdateLink("alignments", "data"),
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
