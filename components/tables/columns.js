"use strict";
import React from 'react';
import * as formatters from './formatters';
import { CENTER, LEFT, ID_COLUMN } from './constants';
import { Link } from 'react-router';
import tableNames from './tableNames';


// See React cell rendering with Ag-Grid: https://www.ag-grid.com/javascript-grid-cell-rendering/
function idColumnWithUpdateLink(tableName, domain) {
    // Make different category links: facilityData, AdminData, etc
    let linkName = domain +'/'+ tableName;
    return Object.assign({}, ID_COLUMN, {
        cellRendererFramework: IdColumnWithUpdateLink,
        cellRendererParams: {tableName: linkName},
        headerCellRenderer: null,
    });
}

class IdColumnWithUpdateLink extends React.PureComponent {
    render() {
        return (
            <Link to = {`/${this.props.tableName}/update/${this.props.value}`}>
                {this.props.value}
           </Link>
        );
    }
}

/**
 * Left-align header labels by default.
 * To deactivate, add this to the column definition:
 *         headerCellRenderer: null
 * (as in idColumnWithUpdateLink above).
 */
export function defaultHeaderRenderer(params) {
    return '<span style="float: left">' + params.colDef.headerName + '</span>';
}


const columns = {
    [tableNames.USERS]: [
        idColumnWithUpdateLink("users","admin"),
        {
            headerName: "Login",
            field: "username",
        },
        {
            headerName: "Role",
            field: "role",
        },
        {
            headerName: "First Name",
            field: "firstName",
        },
        {
            headerName: "Last Name",
            field: "lastName",
        },
        {
            headerName: "Laboratory",
            field: "piFirstName",
        },
        {
            headerName: "Validated",
            field: "isvalidated",
            cellRenderer: function(params) {
                return params.value ?
                     '<i class="fa fa-check" aria-hidden="true"></i>'
                   : '<i class="fa fa-times" style="color:red" aria-hidden="true"></i>'
            }
        },
    ],
    //add admin tables columns
    [tableNames.PROJECT_SHARINGS]: [
        idColumnWithUpdateLink("project_sharings","admin"),
        {
            headerName: "Collaborator",
            field: "collaborator",
        },
        {
            headerName: "Project",
            field: "project",
        },
        {
            headerName: "Project Owner",
            field: "laboratory",
        }
    ],
    [tableNames.ANALYSIS_TYPES]: [
        idColumnWithUpdateLink("analysis_types","admin"),
        {
            headerName: "Description",
            field: "description",
        },{
            headerName: "Customer Viewable",
            field: "customerViewable",
        },{
            headerName: "UseAllReads",
            field: "useallreads",
        },{
            headerName: "Comment",
            field: "comment",
        }
    ],
    [tableNames.FLOWCELL_TYPES]: [
        idColumnWithUpdateLink("flowcell_types","admin"),
        {
            headerName: "Version",
            field: "version",
        }
    ],
    [tableNames.INSTRUMENTS]: [
        idColumnWithUpdateLink("instruments","admin"),
        {
            headerName: "Internal Name",
            field: "internalName",
        },
        {
            headerName: "Model",
            field: "model",
        },
        {
            headerName: "Serial Nb",
            field: "serialNb",
        },
        {
            headerName: "IsSequencer",
            field: "issequencer",
        }
    ],
    [tableNames.LIBRARY_ADAPTERS]: [
        idColumnWithUpdateLink("library_adapters","admin"),
        {
            headerName: "Name",
            field: "name",
        },
        {
            headerName: "Length",
            field: "length",
        }
    ],
    [tableNames.LIB_PROTOCOLS]: [
        idColumnWithUpdateLink("library_protocols","admin"),
        {
            headerName: "Name",
            field: "name",
        },
        {
            headerName: "Short Name",
            field: "shortName",
        },
        {
            headerName: "Ref Nb",
            field: "refNb",
        },
        {
            headerName: "Release Month",
            field: "releaseMonth",
        },
        {
            headerName: "HasInsertSizeSelection",
            field: "hasinsertsizeselection",
        },
        {
            headerName: "IsDeprecated",
            field: "isdeprecated",
        }
    ],
    [tableNames.LIBRARY_STATES]: [
        idColumnWithUpdateLink("library_states","admin"),
        {
            headerName: "State Order",
            field: "stateOrder",
        },  
        {
            headerName: "Name",
            field: "name",
        },
        {
            headerName: "Description",
            field: "description",
        }
    ],
    [tableNames.MAPPING_TOOLS]: [
        idColumnWithUpdateLink("mapping_tools","admin"),
        {
            headerName: "Name",
            field: "name",
        },
        {
            headerName: "Version",
            field: "version",
        },
        {
            headerName: "Reference",
            field: "reference",
        }
    ],
    [tableNames.MULTIPLEX_INDEXES]: [
        idColumnWithUpdateLink("multiplex_indexes","admin"),
        {
            headerName: "Name",
            field: "name",
        },
        {
            headerName: "Manufacturer",
            field: "manufacturer",
        },
        {
            headerName: "Sequence",
            field: "sequence",
        },
        {
            headerName: "Index Group",
            field: "indexGroup",
        },
        {
            headerName: "IsMultiplexing",
            field: "ismultiplexing",
        },
        {
            headerName: "IsDeprecated",
            field: "isdeprecated",
        }
    ],
    [tableNames.PIPELINE_VERSIONS]: [
        idColumnWithUpdateLink("pipeline_versions","admin"),
        {
            headerName: "Software Name",
            field: "softwareName",
        },
        {
            headerName: "Number",
            field: "number",
        },
        {
            headerName: "Description",
            field: "description",
        }
    ],
    [tableNames.PROJECT_ANALYSIS]: [
        idColumnWithUpdateLink("project_analysis","admin"),
        {
            headerName: "Name",
            field: "name",
        },
        {
            headerName: "Description",
            field: "description",
        },
        {
            headerName: "IsReported",
            field: "isreported",
        }
    ],
    [tableNames.PROJECT_STATES]: [
        idColumnWithUpdateLink("project_states","admin"),
        {
            headerName: "State Order",
            field: "stateOrder",
        },
        {
            headerName: "Name",
            field: "name",
        },
        {
            headerName: "Description",
            field: "description",
        }
    ],
    [tableNames.QUANTIF_METHODS]: [
        idColumnWithUpdateLink("quantif_methods","admin"),
        {
            headerName: "Name",
            field: "name",
        }

    ],
    [tableNames.READ_LENGTHS]: [
        idColumnWithUpdateLink("read_lengths","admin"),
        {
            headerName: "Length",
            field: "length",
        }

    ],
    [tableNames.RUN_TYPES]: [
        idColumnWithUpdateLink("run_types","admin"),
        {
            headerName: "Name",
            field: "name",
        }

    ],
    [tableNames.RUN_TYPES_LENGTHS]: [
        idColumnWithUpdateLink("run_types_lengths","admin"),
        {
            headerName: "Run Type",
            field: "name",
        },
        {
            headerName: "Read Length",
            field: "length",
        },
        {
            headerName: "Discarded",
            field: "isdeprecated",
        }

    ],
    [tableNames.SAMPLE_TYPES]: [
        idColumnWithUpdateLink("sample_types","admin"),
        {
            headerName: "Name",
            field: "name",
        }

    ],
    [tableNames.SEQUENCING_KIT_VERSIONS]: [
        idColumnWithUpdateLink("sequencing_kit_versions","admin"),
        {
            headerName: "Version",
            field: "version",
        },
        {
            headerName: "Ref Number",
            field: "refNumber",
        }

    ],
    [tableNames.SEQUENCING_QUALITIES]: [
        idColumnWithUpdateLink("sequencing_qualities","admin"),
        {
            headerName: "Name",
            field: "name",
        },
        {
            headerName: "pass QC",
            field: "passQc",
        },
        {
            headerName: "Delivered",
            field: "delivered",
        }

    ],
    [tableNames.TAXONOMIES]: [
        idColumnWithUpdateLink("taxonomies","admin"),
        {
            headerName: "Name",
            field: "name",
        },
        {
            headerName: "Ref Name",
            field: "refName",
        },
        {
            headerName: "Ncbi Id",
            field: "ncbiId",
        }

    ],
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
            field: "multiplex_nb",
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


export default columns;