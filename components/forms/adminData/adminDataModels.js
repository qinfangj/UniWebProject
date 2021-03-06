//in order to define all the Admin data forms
//define the props such as model,label,name,width etc for CommonAdminForm

import inputTypes from '../../constants/inputTypes';
import validators from '../../forms/validators';
import optionsStoreKeys from '../../constants/optionsStoreKeys';


const adminData = {
    "users": {
        fields: [
            {
                label: "First Name",
                name:  "firstName",
                width:  3,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Last Name",
                name:  "lastName",
                width:  3,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Login Name",
                name:  "login",
                width:  6,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Phone",
                name: "phone",
                width: 3,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Email",
                name: "email",
                width: 3,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Address",
                name: "address",
                width: 6,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Laboratory",
                name: "laboratoryId",
                width: 6,
                required: true,
                inputType: inputTypes.DROPDOWN,
                optionsKey: optionsStoreKeys.LABORATORIES,
            },{
                label: "LIMS Access",
                name:  "role",
                width:  6,
                required: true,
                inputType: inputTypes.DROPDOWN,
                options: [
                    ["no access", "no access"],
                    ["customer", "customer"],
                    ["facility", "facility"],
                    ["admin", "admin"]
                ],
                hasNoneValue: false,
            }
        ],
        model: "limsUsersForm"
    },
    "project_sharings": {
        fields: [
            {
                label: "Project",
                name:  "projectId",
                width:  6,
                required: true,
                inputType: inputTypes.DROPDOWN,
                optionsKey: optionsStoreKeys.PROJECTS_ALL,
            },
            {
                label: "Collaborator",
                name:  "personId",
                width:  6,
                required: true,
                inputType: inputTypes.DROPDOWN,
                optionsKey: optionsStoreKeys.PEOPLE,
            },
            {
                label: "Description",
                name:  "description",
                width:  12,
                required: true,
                inputType: inputTypes.TEXT
            },
        ],
        model: "projectSharingsForm"
    },
    "pipeline_analysis_types": {
        fields: [
            {
                label: "Description",
                name:  "description",
                width:  3,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Customer Viewable",
                name:  "customerViewable",
                width:  3,
                inputType: inputTypes.CHECKBOX
            },
            {
                label: "UseAllReads",
                name:  "useallreads",
                width:  6,
                inputType: inputTypes.CHECKBOX
            },
            {
                label: "Comment",
                name:  "comment",
                width:  12,
                required: true,
                inputType: inputTypes.TEXT
            }
        ],
        model: "analysisTypeForm"
    },
    "flowcell_types": {
        fields: [
            {
                label: "Version",
                name:  "version",
                width:  12,
                required: true,
                inputType: inputTypes.TEXT
            },

        ],
        model: "flowcellTypesForm"
    },
    "instruments": {
        fields: [
            {
                label: "Internal Name",
                name:  "internalName",
                width:  4,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Model",
                name:  "model",
                width:  4,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Serial Nb",
                name:  "serialNumber",
                width:  3,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Is sequencer",
                name:  "issequencer",
                width:  1,
                inputType: inputTypes.CHECKBOX
            }
        ],
        model: "instrumentsForm"
    },
    "library_adapters": {
        fields: [
            {
                label: "Name",
                name:  "name",
                width:  9,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Length",
                name:  "length",
                width:  3,
                required: true,
                inputType : inputTypes.TEXT
            }
        ],
        model: "libAdaptersForm"
    },
    "lib_protocols": {
        fields: [
            {
                label: "Name",
                name:  "name",
                width:  6,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Short Name",
                name:  "shortName",
                width:  3,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Application ID",
                name:  "application_id",
                width:  3,
                required: true,
                inputType: inputTypes.DROPDOWN,
                optionsKey: optionsStoreKeys.UHTS_APPLICATIONS,
            },
            {
                label: "Ref Nb",
                name:  "refNb",
                width:  3,
                required: false,
                inputType: inputTypes.TEXT
            },
            {
                label: "Release Month",
                name:  "releaseMonth",
                width:  3,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "HasInsertSizeSelection",
                name:  "hasinsertsizeselection",
                width:  3,
                inputType: inputTypes.CHECKBOX
            },
            {
                label: "Is deprecated",
                name:  "isdeprecated",
                width:  3,
                inputType: inputTypes.CHECKBOX
            }
        ],
        model: "libProtocolsForm"
    },
    "library_states": {
        fields: [
            {
                label: "State Order",
                name:  "stateOrder",
                width:  3,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Name",
                name:  "name",
                width:  9,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Description",
                name:  "description",
                width:  12,
                required: true,
                inputType: inputTypes.TEXT
            }
        ],
        model: "libStatesForm"
    },
    "mapping_tools": {
        fields: [
            {
                label: "Name",
                name:  "name",
                width:  4,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Version",
                name:  "version",
                width:  2,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Reference",
                name:  "reference",
                width:  6,
                required: true,
                inputType: inputTypes.TEXT
            }
        ],
        model: "mappingToolsForm"
    },
    "multiplex_indexes": {
        fields: [
            {
                label: "Name",
                name:  "name",
                width:  4,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Manufacturer",
                name:  "manufacturer",
                width:  4,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Sequence",
                name:  "sequence",
                width:  4,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Index Group",
                name:  "indexGroup",
                width:  4,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Is multiplexing",
                name:  "ismultiplexing",
                width:  4,
                inputType: inputTypes.CHECKBOX
            },
            {
                label: "Is deprecated",
                name:  "isdeprecated",
                width:  4,
                inputType: inputTypes.CHECKBOX
            },
        ],
        model: "multiplexIndexesForm"
    },
    "pipeline_versions": {
        fields: [
            {
                label: "Software Name",
                name:  "softwareName",
                width:  4,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Number",
                name:  "number",
                width:  2,
                required: true,
                inputType: inputTypes.TEXT,
                type: "number",
            },
            {
                label: "Description",
                name:  "description",
                width:  6,
                required: true,
                inputType: inputTypes.TEXT
            }
        ],
        model: "pipelineVersionForm"
    },
    "project_analysis": {
        fields: [
            {
                label: "Name",
                name:  "name",
                width:  3,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Description",
                name:  "description",
                width:  6,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Is reported",
                name:  "isreported",
                width:  3,
                inputType: inputTypes.CHECKBOX
            }
        ],
        model: "projectAnalysisForm"
    },
    "project_states": {
        fields: [
            {
                label: "State Order",
                name:  "stateOrder",
                width:  3,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Name",
                name:  "name",
                width:  9,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Description",
                name:  "description",
                width:  12,
                required: true,
                inputType: inputTypes.TEXT
            }

        ],
        model: "projectStatesForm"
    },
    "quantif_methods": {
        fields: [
            {
                label: "Name",
                name:  "name",
                width:  12,
                required: true,
                inputType: inputTypes.TEXT
            }
        ],
        model: "quantifMethodsForm"
    },
    "read_lengths": {
        fields: [
            {
                label: "Length",
                name:  "length",
                width:  12,
                required: true,
                inputType: inputTypes.TEXT
            }
        ],
        model: "readLengthsForm"
    },
    "run_types": {
        fields: [
            {
                label: "Name",
                name:  "name",
                width:  12,
                required: true,
                inputType: inputTypes.TEXT
            }
        ],
        model: "runTypesForm"
    },
    "run_types_lengths": {
        fields: [
            {
                label: "Run Type",
                name:  "runTypeId",
                width:  4,
                required: true,
                inputType: inputTypes.DROPDOWN,
                optionsKey: optionsStoreKeys.RUN_TYPES,
            },
            {
                label: "Read Length",
                name:  "readLengthId",
                width:  4,
                required: true,
                inputType: inputTypes.DROPDOWN,
                optionsKey: optionsStoreKeys.READ_LENGTHS,
            },
            {
                label: "Discarded",
                name:  "isdeprecated",
                width:  4,
                inputType: inputTypes.CHECKBOX
            }
        ],
        model: "runTypesLengthsForm"
    },
    "sample_types": {
        fields: [
            {
                label: "Name",
                name:  "name",
                width:  12,
                required: true,
                inputType: inputTypes.TEXT
            }
        ],
        model: "samplesTypesForm"
    },
    "sequencing_kit_versions": {
        fields: [
            {
                label: "Version",
                name:  "version",
                width:  6,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Ref Number",
                name:  "refNumber",
                width:  6,
                required: true,
                inputType: inputTypes.TEXT
            }
        ],
        model: "seqKitVersionForm"
    },
    "sequencing_qualities": {
        fields: [
            {
                label: "Name",
                name:  "name",
                width:  6,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Pass QC",
                name:  "passQc",
                width:  3,
                inputType: inputTypes.CHECKBOX
            },
            {
                label: "Delivered",
                name:  "delivered",
                width:  3,
                inputType: inputTypes.CHECKBOX
            }
        ],
        model: "seqQualitiesForm"
    },
    "taxonomies": {
        fields: [
            {
                label: "Name",
                name:  "name",
                width:  12,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Ref Name",
                name:  "refName",
                width:  9,
                required: true,
                inputType: inputTypes.TEXT
            },
            {
                label: "Ncbi Id",
                name:  "ncbiId",
                width:  3,
                required: true,
                inputType: inputTypes.TEXT
            }
        ],
        model: "taxonomiesForm"
    },
    "uhts_applications": {
        fields: [
            {
                label: "Name",
                name:  "name",
                width:  12,
                required: true,
                inputType: inputTypes.TEXT
            },
        ],
        model: "uhtsApplicationsForm"
    }
};

export default adminData;
