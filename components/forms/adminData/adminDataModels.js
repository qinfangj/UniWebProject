//in order to define all the Admin data forms
//define the props such as model,label,name,size etc for CommonAdminForm

import inputTypes from '../inputTypes';

const adminData = {
    "users": {
        "fields": [
            {
                "label": "Login Name",
                "name":  "login",
                "size":  3,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "First Name",
                "name":  "firstName",
                "size":  3,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Last Name",
                "name":  "lastName",
                "size":  3,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Phone",
                "name": "phone",
                "size": 3,
                "required": false,
                "type": inputTypes.TEXT
            },
            {
                "label": "Email",
                "name": "email",
                "size": 3,
                "required": false,
                "type": inputTypes.TEXT
            },
            {
                "label": "Address",
                "name": "address",
                "size": 6,
                "required": false,
                "type": inputTypes.TEXT
            },
            {
                "label": "Laboratory",
                "name": "laboratoryId",
                "size": 6,
                "required": true,
                "type": inputTypes.DROPDOWN
            },{
                "label": "LIMS Access",
                "name":  "role",
                "size":  3,
                "required": false,
                "type": inputTypes.DROPDOWN
            }
        ],
        "model": "limsUsersForm"
    },
    "project_sharings": {
        "fields": [
            {
                "label": "Description",
                "name":  "description",
                "size":  12,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Project",
                "name":  "projectId",
                "size":  6,
                "required": true,
                "type": inputTypes.DROPDOWN
            },
            {
                "label": "Collaborator",
                "name":  "personId",
                "size":  6,
                "required": true,
                "type": inputTypes.DROPDOWN
            }
        ],
        "model": "projectSharingsForm"
    },
    "pipeline_analysis_types": {
        "fields": [
            {
                "label": "Description",
                "name":  "description",
                "size":  3,
                "required": false,
                "type": inputTypes.TEXT
            },
            {
                "label": "Customer Viewable",
                "name":  "customerViewable",
                "size":  3,
                "required": false,
                "type": inputTypes.CHECKBOX
            },
            {
                "label": "UseAllReads",
                "name":  "useallreads",
                "size":  6,
                "required": true,
                "type": inputTypes.CHECKBOX
            },
            {
                "label": "Comment",
                "name":  "comment",
                "size":  12,
                "required": false,
                "type": inputTypes.TEXT
            }
        ],
        "model": "analysisTypeForm"
    },
    "flowcell_types": {
        "fields": [
            {
                "label": "Version",
                "name":  "version",
                "size":  12,
                "required": true,
                "type": inputTypes.TEXT
            },

        ],
        "model": "flowcellTypesForm"
    },
    "instruments": {
        "fields": [
            {
                "label": "Internal Name",
                "name":  "internalName",
                "size":  4,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Model",
                "name":  "model",
                "size":  4,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Serial Nb",
                "name":  "serialNumber",
                "size":  3,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "IsSequencer",
                "name":  "issequencer",
                "size":  1,
                "required": false,
                "type": inputTypes.CHECKBOX
            }
        ],
        "model": "instrumentsForm"
    },
    "library_adapters": {
        "fields": [
            {
                "label": "Name",
                "name":  "name",
                "size":  9,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Length",
                "name":  "length",
                "size":  3,
                "required": true,
                "type" : inputTypes.TEXT
            }
        ],
        "model": "libAdaptersForm"
    },
    "lib_protocols": {
        "fields": [
            {
                "label": "Name",
                "name":  "name",
                "size":  9,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Short Name",
                "name":  "shortName",
                "size":  3,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Ref Nb",
                "name":  "refNb",
                "size":  3,
                "required": false,
                "type": inputTypes.TEXT
            },
            {
                "label": "Release Month",
                "name":  "releaseMonth",
                "size":  3,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "HasInsertSizeSelection",
                "name":  "hasInsertSizeSelection",
                "size":  3,
                "required": true,
                "type": inputTypes.CHECKBOX
            },
            {
                "label": "IsDeprecated",
                "name":  "isDeprecated",
                "size":  3,
                "required": true,
                "type": inputTypes.CHECKBOX
            }
        ],
        "model": "libProtocolsForm"
    },
    "library_states": {
        "fields": [
            {
                "label": "State Order",
                "name":  "stateOrder",
                "size":  3,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Name",
                "name":  "name",
                "size":  9,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  12,
                "required": false,
                "type": inputTypes.TEXT
            }
        ],
        "model": "libStatesForm"
    },
    "mapping_tools": {
        "fields": [
            {
                "label": "Name",
                "name":  "name",
                "size":  4,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Version",
                "name":  "version",
                "size":  2,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Reference",
                "name":  "reference",
                "size":  6,
                "required": true,
                "type": inputTypes.TEXT
            }
        ],
        "model": "mappingToolsForm"
    },
    "multiplex_indexes": {
        "fields": [
            {
                "label": "Name",
                "name":  "name",
                "size":  4,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Manufacturer",
                "name":  "manufacturer",
                "size":  4,
                "required": false,
                "type": inputTypes.TEXT
            },
            {
                "label": "Sequence",
                "name":  "sequence",
                "size":  4,
                "required": false,
                "type": inputTypes.TEXT
            },
            {
                "label": "Index Group",
                "name":  "indexGroup",
                "size":  4,
                "required": false,
                "type": inputTypes.TEXT
            },
            {
                "label": "IsMultiplexing",
                "name":  "isMultiplexing",
                "size":  4,
                "required": true,
                "type": "Boolean"
            },
            {
                "label": "IsDeprecated",
                "name":  "isDeprecated",
                "size":  4,
                "required": false,
                "type": inputTypes.CHECKBOX
            },
        ],
        "model": "multiplexIndexesForm"
    },
    "pipeline_versions": {
        "fields": [
            {
                "label": "Software Name",
                "name":  "softwareName",
                "size":  4,
                "required": false,
                "type": inputTypes.TEXT
            },
            {
                "label": "Number",
                "name":  "number",
                "size":  2,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  6,
                "required": false,
                "type": inputTypes.TEXT
            }
        ],
        "model": "pipelineVersionForm"
    },
    "project_analysis": {
        "fields": [
            {
                "label": "Name",
                "name":  "name",
                "size":  3,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  6,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "IsReported",
                "name":  "isReported",
                "size":  3,
                "required": true,
                "type": inputTypes.CHECKBOX
            }
        ],
        "model": "projectAnalysisForm"
    },
    "project_states": {
        "fields": [
            {
                "label": "State Order",
                "name":  "stateOrder",
                "size":  3,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Name",
                "name":  "name",
                "size":  9,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  12,
                "required": false,
                "type": inputTypes.TEXT
            }

        ],
        "model": "projectStatesForm"
    },
    "quantif_methods": {
        "fields": [
            {
                "label": "Name",
                "name":  "name",
                "size":  12,
                "required": true,
                "type": inputTypes.TEXT
            }
        ],
        "model": "quantifMethodsForm"
    },
    "read_lengths": {
        "fields": [
            {
                "label": "Length",
                "name":  "length",
                "size":  12,
                "required": true,
                "type": inputTypes.TEXT
            }
        ],
        "model": "readLengthsForm"
    },
    "run_types": {
        "fields": [
            {
                "label": "Name",
                "name":  "name",
                "size":  12,
                "required": true,
                "type": inputTypes.TEXT
            }
        ],
        "model": "runTypesForm"
    },
    "run_types_lengths": {
        "fields": [
            {
                "label": "Run Type",
                "name":  "runTypeId",
                "size":  4,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Read Length",
                "name":  "runLengthId",
                "size":  4,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Discarded",
                "name":  "isDepreated",
                "size":  4,
                "required": true,
                "type": inputTypes.CHECKBOX
            }
        ],
        "model": "runTypesLengthsForm"
    },
    "sample_types": {
        "fields": [
            {
                "label": "Name",
                "name":  "name",
                "size":  12,
                "required": true,
                "type": inputTypes.TEXT
            }
        ],
        "model": "samplesTypesForm"
    },
    "sequencing_kit_versions": {
        "fields": [
            {
                "label": "Version",
                "name":  "version",
                "size":  6,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Ref Number",
                "name":  "refNumber",
                "size":  6,
                "required": false,
                "type": inputTypes.TEXT
            }
        ],
        "model": "seqKitVersionForm"
    },
    "sequencing_qualities": {
        "fields": [
            {
                "label": "Name",
                "name":  "name",
                "size":  6,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Pass QC",
                "name":  "passQc",
                "size":  3,
                "required": true,
                "type": inputTypes.CHECKBOX
            },
            {
                "label": "Delivered",
                "name":  "delivered",
                "size":  3,
                "required": true,
                "type": inputTypes.CHECKBOX
            }
        ],
        "model": "seqQualitiesForm"
    },
    "taxonomies": {
        "fields": [
            {
                "label": "Name",
                "name":  "name",
                "size":  12,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Ref Name",
                "name":  "refName",
                "size":  9,
                "required": true,
                "type": inputTypes.TEXT
            },
            {
                "label": "Ncbi Id",
                "name":  "ncbiId",
                "size":  3,
                "required": true,
                "type": inputTypes.TEXT
            }
        ],
        "model": "taxonomiesForm"
    }
};

export default adminData;
