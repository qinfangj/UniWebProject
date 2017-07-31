"use strict";
import React from 'react';
import * as formatters from '../formatters';
import tableNames from '../../constants/tableNames';
import { ID_COLUMN } from '../tables';



const adminDataColumns = {
    [tableNames.USERS]: [
        ID_COLUMN,
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
            cellRenderer: function(isTrue) {
                return isTrue ?
                      <i className="fa fa-check" aria-hidden="true"/>
                    : <i className="fa fa-times" style="color:red" aria-hidden="true"/>
            }
        },
    ],
    //add admin tables columns
    [tableNames.PROJECT_SHARINGS]: [
        ID_COLUMN,
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
        ID_COLUMN,
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
        ID_COLUMN,
        {
            headerName: "Version",
            field: "version",
        }
    ],
    [tableNames.INSTRUMENTS]: [
        ID_COLUMN,
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
        ID_COLUMN,
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
        ID_COLUMN,
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
        ID_COLUMN,
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
        ID_COLUMN,
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
        ID_COLUMN,
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
        ID_COLUMN,
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
        ID_COLUMN,
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
        ID_COLUMN,
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
        ID_COLUMN,
        {
            headerName: "Name",
            field: "name",
        }
    ],
    [tableNames.READ_LENGTHS]: [
        ID_COLUMN,
        {
            headerName: "Length",
            field: "length",
        }
    ],
    [tableNames.RUN_TYPES]: [
        ID_COLUMN,
        {
            headerName: "Name",
            field: "name",
        }
    ],
    [tableNames.RUN_TYPES_LENGTHS]: [
        ID_COLUMN,
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
        ID_COLUMN,
        {
            headerName: "Name",
            field: "name",
        }
    ],
    [tableNames.SEQUENCING_KIT_VERSIONS]: [
        ID_COLUMN,
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
        ID_COLUMN,
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
        ID_COLUMN,
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

