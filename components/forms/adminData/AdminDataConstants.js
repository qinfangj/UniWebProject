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
                "required": false
            },
            {
                "label": "Customer Viewable",
                "name":  "customer_viewable",
                "size":  3,
                "required": false
            },
            {
                "label": "UseAllReads",
                "name":  "useAllReads",
                "size":  6,
                "required": true
            },
            {
                "label": "Comment",
                "name":  "comment",
                "size":  12,
                "required": false
            }
        ],
        "model": "analysisTypeForm"
    },
    "flowcell_types": {
        "fields": [
            {
                "label": "Verserion",
                "name":  "version",
                "size":  12,
                "required": true
            },

        ],
        "model": "flowcellTypesForm"
    },
    "instruments": {
        "fields": [
            {
                "label": "Internal Name",
                "name":  "internal_name",
                "size":  4,
                "required": true
            },
            {
                "label": "Model",
                "name":  "model",
                "size":  4,
                "required": true
            },
            {
                "label": "Serial Nb",
                "name":  "serial_nb",
                "size":  3,
                "required": true
            },
            {
                "label": "IsSequencer",
                "name":  "isSequencer",
                "size":  1,
                "required": false
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
                "required": true
            },
            {
                "label": "Length",
                "name":  "length",
                "size":  3,
                "required": true
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
                "required": true
            },
            {
                "label": "Short Name",
                "name":  "short_name",
                "size":  3,
                "required": true
            },
            {
                "label": "Ref Nb",
                "name":  "ref_nb",
                "size":  3,
                "required": false
            },
            {
                "label": "Release Month",
                "name":  "release_month",
                "size":  3,
                "required": true
            },
            {
                "label": "HasInsertSizeSelection",
                "name":  "hasInsertSizeSelection",
                "size":  3,
                "required": true
            },
            {
                "label": "IsDeprecated",
                "name":  "isDeprecated",
                "size":  3,
                "required": true
            }
        ],
        "model": "libProtocolsForm"
    },
    "library_states": {
        "fields": [
            {
                "label": "State Order",
                "name":  "state_order",
                "size":  3,
                "required": true
            },
            {
                "label": "Name",
                "name":  "name",
                "size":  9,
                "required": true
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  12,
                "required": false
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
                "required": true
            },
            {
                "label": "Version",
                "name":  "version",
                "size":  2,
                "required": true
            },
            {
                "label": "Reference",
                "name":  "reference",
                "size":  6,
                "required": true
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
                "required": true
            },
            {
                "label": "Manufacturer",
                "name":  "manufacturer",
                "size":  4,
                "required": false
            },
            {
                "label": "Sequence",
                "name":  "sequence",
                "size":  4,
                "required": false
            },
            {
                "label": "Index Group",
                "name":  "index_group",
                "size":  4,
                "required": false
            },
            {
                "label": "IsMultiplexing",
                "name":  "isMultiplexing",
                "size":  4,
                "required": true
            },
            {
                "label": "IsDeprecated",
                "name":  "isDeprecated",
                "size":  4,
                "required": false
            },
        ],
        "model": "multiplexIndexesForm"
    },
    "pipeline_versions": {
        "fields": [
            {
                "label": "Software Name",
                "name":  "software_name",
                "size":  4,
                "required": false
            },
            {
                "label": "Number",
                "name":  "number",
                "size":  2,
                "required": true
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  6,
                "required": false
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
                "required": true
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  6,
                "required": true
            },
            {
                "label": "IsReported",
                "name":  "isReported",
                "size":  3,
                "required": true
            }
        ],
        "model": "projectAnalysisForm"
    },
    "project_states": {
        "fields": [
            {
                "label": "State Order",
                "name":  "state_order",
                "size":  3,
                "required": true
            },
            {
                "label": "Name",
                "name":  "name",
                "size":  9,
                "required": true
            },
            {
                "label": "Description",
                "name":  "description",
                "size":  12,
                "required": false
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
                "required": true
            }
        ],
        "model": "quantifMethodsForm"
    },
    "read_lengths": {
        "fields": [
            {
                "label": "Name",
                "name":  "name",
                "size":  12,
                "required": true
            }
        ],
        "model": "readLengthsForm"
    },
    "run_types": {
        "fields": [
            {
                "label": "Length",
                "name":  "length",
                "size":  12,
                "required": true
            }
        ],
        "model": "runTypesForm"
    },
    "run_types_lengths": {
        "fields": [
            {
                "label": "Run Type",
                "name":  "run_type_id",
                "size":  4,
                "required": true
            },
            {
                "label": "Read Length",
                "name":  "read_length_id",
                "size":  4,
                "required": true
            },
            {
                "label": "Discarded",
                "name":  "isDeprecated",
                "size":  4,
                "required": true
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
                "required": true
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
                "required": true
            },
            {
                "label": "Ref Number",
                "name":  "ref_number",
                "size":  6,
                "required": false
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
                "required": true
            },
            {
                "label": "Pass QC",
                "name":  "pass_QC",
                "size":  3,
                "required": true
            },
            {
                "label": "Delivered",
                "name":  "delivered",
                "size":  3,
                "required": true
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
                "required": true
            },
            {
                "label": "Ref Name",
                "name":  "ref_name",
                "size":  9,
                "required": true
            },
            {
                "label": "Ncbi Id",
                "name":  "ncbi_id",
                "size":  3,
                "required": true
            }
        ],
        "model": "taxonomiesForm"
    }
};

export default adminData;
