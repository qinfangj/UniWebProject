//in order to define all the Admin data forms
//define the props such as model,label,name,size etc for CommonAdminForm
const adminData = {
    "project_sharings": {
        "fields": [
            {
                "label": "Project",
                "name":  "project_id",
                "size":  6,
                "required": true
            },
            {
                "label": "Collaborator",
                "name":  "person_id",
                "size":  6,
                "required": true
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  12,
                "required": true
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
                "type": ""
            },
            {
                "label": "Customer Viewable",
                "name":  "customerViewable",
                "size":  3,
                "required": false,
                "type": "Boolean"
            },
            {
                "label": "UseAllReads",
                "name":  "useallreads",
                "size":  6,
                "required": true,
                "type": "Boolean"
            },
            {
                "label": "Comment",
                "name":  "comment",
                "size":  12,
                "required": false,
                "type": ""
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
                "type": ""
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
                "type": ""
            },
            {
                "label": "Model",
                "name":  "model",
                "size":  4,
                "required": true,
                "type": ""
            },
            {
                "label": "Serial Nb",
                "name":  "serialNumber",
                "size":  3,
                "required": true,
                "type": ""
            },
            {
                "label": "IsSequencer",
                "name":  "isSequencer",
                "size":  1,
                "required": false,
                "type": "Boolean"
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
                "type":""
            },
            {
                "label": "Length",
                "name":  "length",
                "size":  3,
                "required": true,
                "type" : "Int"
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
                "type": ""
            },
            {
                "label": "Short Name",
                "name":  "shortName",
                "size":  3,
                "required": true,
                "type": ""
            },
            {
                "label": "Ref Nb",
                "name":  "refNb",
                "size":  3,
                "required": false,
                "type": ""
            },
            {
                "label": "Release Month",
                "name":  "releaseMonth",
                "size":  3,
                "required": true,
                "type": ""
            },
            {
                "label": "HasInsertSizeSelection",
                "name":  "hasInsertSizeSelection",
                "size":  3,
                "required": true,
                "type":"Boolean"
            },
            {
                "label": "IsDeprecated",
                "name":  "isDeprecated",
                "size":  3,
                "required": true,
                "type":"Boolean"
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
                "type":"Int"
            },
            {
                "label": "Name",
                "name":  "name",
                "size":  9,
                "required": true,
                "type":""
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  12,
                "required": false,
                "type": ""
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
                "type": ""
            },
            {
                "label": "Version",
                "name":  "version",
                "size":  2,
                "required": true,
                "type":""
            },
            {
                "label": "Reference",
                "name":  "reference",
                "size":  6,
                "required": true,
                "type":""
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
                "type": ""
            },
            {
                "label": "Manufacturer",
                "name":  "manufacturer",
                "size":  4,
                "required": false,
                "type": ""
            },
            {
                "label": "Sequence",
                "name":  "sequence",
                "size":  4,
                "required": false,
                "type": ""
            },
            {
                "label": "Index Group",
                "name":  "indexGroup",
                "size":  4,
                "required": false,
                "type": ""
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
                "type": "Boolean"
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
                "type": ""
            },
            {
                "label": "Number",
                "name":  "number",
                "size":  2,
                "required": true,
                "type": "Int"
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  6,
                "required": false,
                "type": ""
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
                "type": ""
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  6,
                "required": true,
                "type": ""
            },
            {
                "label": "IsReported",
                "name":  "isReported",
                "size":  3,
                "required": true,
                "type": "Boolean"
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
                "type": "Int"
            },
            {
                "label": "Name",
                "name":  "name",
                "size":  9,
                "required": true,
                "type": ""
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  12,
                "required": false,
                "type": ""
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
                "type": ""
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
                "type": "Int"
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
                "type": ""
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
                "type": "Int"
            },
            {
                "label": "Read Length",
                "name":  "runLengthId",
                "size":  4,
                "required": true,
                "type": "Int"
            },
            {
                "label": "Discarded",
                "name":  "isDepreated",
                "size":  4,
                "required": true,
                "type": "Boolean"
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
                "type": ""
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
                "type": ""
            },
            {
                "label": "Ref Number",
                "name":  "refNumber",
                "size":  6,
                "required": false,
                "type": ""
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
                "type": ""
            },
            {
                "label": "Pass QC",
                "name":  "passQc",
                "size":  3,
                "required": true,
                "type": "Boolean"
            },
            {
                "label": "Delivered",
                "name":  "delivered",
                "size":  3,
                "required": true,
                "type": "Boolean"
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
                "type": ""
            },
            {
                "label": "Ref Name",
                "name":  "refName",
                "size":  9,
                "required": true,
                "type": ""
            },
            {
                "label": "Ncbi Id",
                "name":  "ncbiId",
                "size":  3,
                "required": true,
                "type": "Int"
            }
        ],
        "model": "taxonomiesForm"
    }
};

export default adminData;
