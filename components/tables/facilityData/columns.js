"use strict";
import React from 'react';
import * as formatters from '../formatters';
import { CENTER, ID_COLUMN } from '../constants';
import { Link } from 'react-router';


// See React cell rendering with Ag-Grid: https://www.ag-grid.com/javascript-grid-cell-rendering/
function idColumnWithUpdateLink(tableName,domain) {
    //make different category links: facilityData,AdminData, etc
    let linkName= (domain===undefined? 'data/'.concat(tableName): domain + '/' + tableName);
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



const columns = {
    //add admin tables columns
    analysis_types: [
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
    flowcell_types: [
        idColumnWithUpdateLink("flowcell_types","admin"),
        {
            headerName: "Version",
            field: "version"
        }
    ],
    instruments: [
        idColumnWithUpdateLink("instruments","admin"),
        {
            headerName: "Internal Name",
            field: "internalName"
        },
        {
            headerName: "Model",
            field: "model"
        },
        {
            headerName: "Serial Nb",
            field: "serialNb"
        },
        {
            headerName: "IsSequencer",
            field: "isSequencer"
        }
    ],
    library_adapters: [
        idColumnWithUpdateLink("library_adapters","admin"),
        {
            headerName: "Name",
            field: "name"
        },
        {
            headerName: "Length",
            field: "length"
        }
    ],
    lib_protocols: [
        idColumnWithUpdateLink("lib_protocols","admin"),
        {
            headerName: "Name",
            field: "name"
        },
        {
            headerName: "Short Name",
            field: "shortName"
        },
        {
            headerName: "Ref Nb",
            field: "refNb"
        },
        {
            headerName: "Release Month",
            field: "releaseMonth"
        },
        {
            headerName: "HasInsertSizeSelection",
            field: "hasInsertSizeSelection"
        },
        {
            headerName: "IsDeprecated",
            field: "isDeprecated"
        }
    ],
    library_states: [
        idColumnWithUpdateLink("library_states","admin"),
        {
            headerName: "State Order",
            field: "stateOrder"
        },
        {
            headerName: "Name",
            field: "name"
        },
        {
            headerName: "Description",
            field: "description"
        }
    ],
    mapping_tools: [
        idColumnWithUpdateLink("mapping_tools","admin"),
        {
            headerName: "Name",
            field: "name"
        },
        {
            headerName: "Version",
            field: "version"
        },
        {
            headerName: "Reference",
            field: "reference"
        }
    ],
    multiplex_indexes: [
        idColumnWithUpdateLink("multiplex_indexes","admin"),
        {
            headerName: "Name",
            field: "name"
        },
        {
            headerName: "Manufacturer",
            field: "manufacturer"
        },
        {
            headerName: "Sequence",
            field: "sequence"
        },
        {
            headerName: "Index Group",
            field: "indexGroup"
        },
        {
            headerName: "IsMultiplexing",
            field: "isMultiplexing"
        },
        {
            headerName: "IsDeprecated",
            field: "isDeprecated"
        }
    ],
    pipeline_versions: [
        idColumnWithUpdateLink("pipeline_versions","admin"),
        {
            headerName: "Software Name",
            field: "softwareName"
        },
        {
            headerName: "Number",
            field: "number"
        },
        {
            headerName: "Description",
            field: "description"
        }
    ],
    project_analysis: [
        idColumnWithUpdateLink("project_analysis","admin"),
        {
            headerName: "Name",
            field: "name"
        },
        {
            headerName: "Description",
            field: "description"
        },
        {
            headerName: "IsReported",
            field: "isReported"
        }
    ],
    project_states: [
        idColumnWithUpdateLink("project_states","admin"),
        {
            headerName: "State Order",
            field: "stateOrder"
        },
        {
            headerName: "Name",
            field: "name"
        },
        {
            headerName: "Description",
            field: "description"
        }
    ],
    quantif_methods: [
        idColumnWithUpdateLink("quantif_methods","admin"),
        {
            headerName: "Name",
            field: "name"
        }

    ],
    read_lengths: [
        idColumnWithUpdateLink("read_lengths","admin"),
        {
            headerName: "Length",
            field: "length"
        }

    ],
    run_types: [
        idColumnWithUpdateLink("run_types","admin"),
        {
            headerName: "Name",
            field: "name"
        }

    ],
    run_types_lengths: [
        idColumnWithUpdateLink("run_types_lengths","admin"),
        {
            headerName: "Run Type",
            field: "runTypeId"
        },
        {
            headerName: "Read Length",
            field: "runLengthId"
        },
        {
            headerName: "Discarded",
            field: "isDepreated"
        }

    ],
    sample_types: [
        idColumnWithUpdateLink("sample_types","admin"),
        {
            headerName: "Name",
            field: "name"
        }

    ],
    sequencing_kit_versions: [
        idColumnWithUpdateLink("sequencing_kit_versions","admin"),
        {
            headerName: "Version",
            field: "version"
        },
        {
            headerName: "Ref Number",
            field: "refNumber"
        }

    ],
    sequencing_qualities: [
        idColumnWithUpdateLink("sequencing_qualities","admin"),
        {
            headerName: "Name",
            field: "name"
        },
        {
            headerName: "pass QC",
            field: "passQc"
        },
        {
            headerName: "Delivered",
            field: "delivered"
        }

    ],
    taxonomies: [
        idColumnWithUpdateLink("taxonomies","admin"),
        {
            headerName: "Name",
            field: "name"
        },
        {
            headerName: "Ref Name",
            field: "refName"
        },
        {
            headerName: "Ncbi Id",
            field: "ncbiId"
        }

    ],
    projects: [
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
    people: [
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
    genomes: [
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
    samples: [
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
    libraries: [
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
    runs: [
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
    user_requests: [
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
    bioanalysers: [
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
    basecallings: [
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
    alignments: [
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