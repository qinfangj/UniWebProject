"use strict";
import React from 'react';
import * as formatters from './formatters';
import { CENTER, ID_COLUMN } from './constants';
import { Link } from 'react-router';
import tableNames from './tableNames';


// See React cell rendering with Ag-Grid: https://www.ag-grid.com/javascript-grid-cell-rendering/
function idColumnWithUpdateLink(tableName,domain) {
    // Make different category links: facilityData, AdminData, etc
    let linkName = (domain === undefined ? 'data/'.concat(tableName) : domain +'/'+ tableName);
    return Object.assign({}, ID_COLUMN, {
        cellRendererFramework: IdColumnWithUpdateLink,
        cellRendererParams: {tableName: linkName}
    });
}

class IdColumnWithUpdateLink extends React.Component {
    render() {
        return <Link to = {`/${this.props.tableName}/update/${this.props.value}`}>
                    {this.props.value}
               </Link>;
    }
}

function headerRenderer(params) {
    let eHeader = document.createElement('span');
    let eTitle = document.createTextNode(params.colDef.headerName);
    eHeader.appendChild(eTitle);
    eHeader.style.float = 'left';
    return eHeader;
}


const columns = {
    [tableNames.USERS]: [
        idColumnWithUpdateLink("users","admin"),
        {
            headerName: "Login",
            field: "username",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Role",
            field: "role",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "FirstName",
            field: "firstName",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "LastName",
            field: "lastName",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Laboratory",
            field: "piFirstName",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Validated",
            field: "isvalidated",
            headerCellRenderer: headerRenderer,
            cellStyle: function(params) {
                if (params.value == true) {
                    //mark validated user as red
                    return {backgroundColor: 'lightblue'};
                } else {
                    return {backgroundColor: 'red'};
                }
            }
        },
    ],
    //add admin tables columns
    [tableNames.PROJECT_SHARINGS]: [
        idColumnWithUpdateLink("project_sharings","admin"),
        {
            headerName: "Collaborator",
            field: "collaborator",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Project",
            field: "project",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Project Owner",
            field: "laboratory",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.ANALYSIS_TYPES]: [
        idColumnWithUpdateLink("analysis_types","admin"),
        {
            headerName: "Description",
            field: "description",
            headerCellRenderer: headerRenderer
        },{
            headerName: "Customer Viewable",
            field: "customerViewable",
            headerCellRenderer: headerRenderer
        },{
            headerName: "UseAllReads",
            field: "useallreads",
            headerCellRenderer: headerRenderer
        },{
            headerName: "Comment",
            field: "comment",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.FLOWCELL_TYPES]: [
        idColumnWithUpdateLink("flowcell_types","admin"),
        {
            headerName: "Version",
            field: "version",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.INSTRUMENTS]: [
        idColumnWithUpdateLink("instruments","admin"),
        {
            headerName: "Internal Name",
            field: "internalName",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Model",
            field: "model",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Serial Nb",
            field: "serialNb",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "IsSequencer",
            field: "issequencer",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.LIBRARY_ADAPTERS]: [
        idColumnWithUpdateLink("library_adapters","admin"),
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Length",
            field: "length",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.LIB_PROTOCOLS]: [
        idColumnWithUpdateLink("library_protocols","admin"),
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Short Name",
            field: "shortName",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Ref Nb",
            field: "refNb",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Release Month",
            field: "releaseMonth",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "HasInsertSizeSelection",
            field: "hasinsertsizeselection",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "IsDeprecated",
            field: "isdeprecated",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.LIBRARY_STATES]: [
        idColumnWithUpdateLink("library_states","admin"),
        {
            headerName: "State Order",
            field: "stateOrder",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Description",
            field: "description",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.MAPPING_TOOLS]: [
        idColumnWithUpdateLink("mapping_tools","admin"),
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Version",
            field: "version",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Reference",
            field: "reference",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.MULTIPLEX_INDEXES]: [
        idColumnWithUpdateLink("multiplex_indexes","admin"),
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Manufacturer",
            field: "manufacturer",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Sequence",
            field: "sequence",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Index Group",
            field: "indexGroup",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "IsMultiplexing",
            field: "ismultiplexing",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "IsDeprecated",
            field: "isdeprecated",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.PIPELINE_VERSIONS]: [
        idColumnWithUpdateLink("pipeline_versions","admin"),
        {
            headerName: "Software Name",
            field: "softwareName",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Number",
            field: "number",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Description",
            field: "description",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.PROJECT_ANALYSIS]: [
        idColumnWithUpdateLink("project_analysis","admin"),
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Description",
            field: "description",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "IsReported",
            field: "isreported",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.PROJECT_STATES]: [
        idColumnWithUpdateLink("project_states","admin"),
        {
            headerName: "State Order",
            field: "stateOrder",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Description",
            field: "description",
            headerCellRenderer: headerRenderer
        }
    ],
    [tableNames.QUANTIF_METHODS]: [
        idColumnWithUpdateLink("quantif_methods","admin"),
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        }

    ],
    [tableNames.READ_LENGTHS]: [
        idColumnWithUpdateLink("read_lengths","admin"),
        {
            headerName: "Length",
            field: "length",
            headerCellRenderer: headerRenderer
        }

    ],
    [tableNames.RUN_TYPES]: [
        idColumnWithUpdateLink("run_types","admin"),
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        }

    ],
    [tableNames.RUN_TYPES_LENGTHS]: [
        idColumnWithUpdateLink("run_types_lengths","admin"),
        {
            headerName: "Run Type",
            field: "name",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Read Length",
            field: "length",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Discarded",
            field: "isdeprecated",
            headerCellRenderer: headerRenderer
        }

    ],
    [tableNames.SAMPLE_TYPES]: [
        idColumnWithUpdateLink("sample_types","admin"),
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        }

    ],
    [tableNames.SEQUENCING_KIT_VERSIONS]: [
        idColumnWithUpdateLink("sequencing_kit_versions","admin"),
        {
            headerName: "Version",
            field: "version",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Ref Number",
            field: "refNumber",
            headerCellRenderer: headerRenderer
        }

    ],
    [tableNames.SEQUENCING_QUALITIES]: [
        idColumnWithUpdateLink("sequencing_qualities","admin"),
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "pass QC",
            field: "passQc",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Delivered",
            field: "delivered",
            headerCellRenderer: headerRenderer
        }

    ],
    [tableNames.TAXONOMIES]: [
        idColumnWithUpdateLink("taxonomies","admin"),
        {
            headerName: "Name",
            field: "name",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Ref Name",
            field: "refName",
            headerCellRenderer: headerRenderer
        },
        {
            headerName: "Ncbi Id",
            field: "ncbiId",
            headerCellRenderer: headerRenderer
        }

    ],
    [tableNames.PROJECTS]: [
        idColumnWithUpdateLink("projects"),
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
        idColumnWithUpdateLink("people"),
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
        idColumnWithUpdateLink("genomes"),
        {
            headerName: "Organism",
            field: "organism",
        },{
            headerName: "Assembly",
            field: "assembly",
        },{
            headerName: "Masked",
            field: "is_masked",
            cellRenderer: formatters.boolean,
            cellStyle: CENTER,
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
        idColumnWithUpdateLink("samples"),
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
        idColumnWithUpdateLink("libraries"),
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
        idColumnWithUpdateLink("runs"),
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
        idColumnWithUpdateLink("user_requests"),
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
        idColumnWithUpdateLink("bioanalysers"),
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
        idColumnWithUpdateLink("basecallings"),
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
        idColumnWithUpdateLink("alignments"),
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