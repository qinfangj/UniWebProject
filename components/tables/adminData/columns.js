"use strict";
import React from 'react';
import * as formatters from '../formatters';
import tableNames from '../../constants/tableNames';
import { idColumnWithUpdateLink, CENTER, LEFT, ID_COLUMN } from '../columns';



const adminDataColumns = {
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
            field: "first_name",
        },
        {
            headerName: "Last Name",
            field: "last_name",
        },
        {
            headerName: "Laboratory",
            field: "pi_last_name",
        },
        {
            headerName: "Validated",
            field: "isValidated",
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
};


export default adminDataColumns;

