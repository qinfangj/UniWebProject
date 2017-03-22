"use strict";
import fields from '../fields';
import formStoreKeys from '../../constants/formStoreKeys';


const types = {
    DROPDOWN: "Dropdown",
    SEC_DROPDOWN: "Secondary dropdown",
    TEXT: "Text field",
    TEXTAREA: "Text area",
    CHECKBOX: "Checkbox",
    DATE: "Date",
};

const DEFAULT_DATE = "1970-01-01";


const facilityDataModels = {
    [formStoreKeys.ALIGNMENTS_INSERT_FORM]: {
        [fields.ANALYSIS_TYPE_ID]: {
            label: "Analysis type",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
            valid: true,
        },
        [fields.RUN_ID]: {  // "runs_output_folders"
            label: "Run",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.BASECALLING_ID]: {  //"basecallings_output_folders",
            label: "Unaligned data output folder",
            type: types.SEC_DROPDOWN,
            defaultValue: -1,
            referenceField: fields.RUN_ID,
            required: true,
        },
        [fields.MAPPING_TOOL_ID]: {
            label: "Mapping tool",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.ELAND_OUTPUT_DIR]: {
            label: "Alignment output folder",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.HAS_QC_PDFS]: {
            label: "QC report",
            type: types.CHECKBOX,
            defaultValue: false,
        },
        [fields.CONFIG_FILE_CONTENT]: {
            label: "Config file content",
            type: types.TEXTAREA,
            defaultValue: "ANALYSIS xxx\nUSE_BASES xxx",
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: types.TEXTAREA,
            defaultValue: "",
        }
    },

    [formStoreKeys.BASECALLINGS_INSERT_FORM]: {
        [fields.RUN_ID]: {
            label: "Run",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.PIPELINE_VERSION_ID]: {
            label: "Pipeline version",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.ANALYSIS_TYPE_ID]: {
            label: "Analysis type",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.CONTROL_LANE_NB]: {
            label: "Control lane",
            type: types.DROPDOWN,
            defaultValue: 0,
        },
        [fields.IS_DEMULTIPLEXING]: {
            label: "Demultiplexing",
            type: types.CHECKBOX,
            defaultValue: false,
        },
        [fields.UNALIGNED_OUTPUT_DIR]: {
            label: "Unaligned data output folder",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: types.TEXTAREA,
            defaultValue: "",
        }
    },

    [formStoreKeys.BIOANALYSERS_INSERT_FORM]: {
        [fields.FILENAME]: {
            label: "Bioanalysers file",
            type: types.TEXT,
            defaultValue: null,
        },
        [fields.BIOANALYSER_DATE]: {
            label: "Bioanalyser date",
            type: types.DATE,
            defaultValue: DEFAULT_DATE,
        },
        [fields.DESCRIPTION]: {
            label: "Description",
            type: types.TEXT,
            defaultValue: "",
        },
        // sub-form
    },

    [formStoreKeys.GENOMES_INSERT_FORM]: {
        [fields.TAXO_ID]: {
            label: "Organism",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.ASSEMBLY]: {
            label: "Assembly",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.GENOME_FOLDER]: {
            label: "Genome folder",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.URL]: {
            label: "URL",
            type: types.TEXT,
            defaultValue: "http://",
            required: true,
        },
        [fields.DOWNLOADED_DATE]: {
            label: "Download date",
            type: types.DATE,
            defaultValue: DEFAULT_DATE,
        },
        [fields.FILES]: {
            label: "File names",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.IS_MASKED]: {
            label: "Masked",
            type: types.CHECKBOX,
            defaultValue: false,
        },
        [fields.IS_ARCHIVED]: {
            label: "Archived",
            type: types.CHECKBOX,
            defaultValue: false,
        }
    },

    [formStoreKeys.LIBRARIES_INSERT_FORM]: {
        [fields.PROJECT_ID]: {
            label: "Project",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.SAMPLE_ID]: {
            label: "Sample",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.NAME]: {
            label: "Name",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.LIB_PROTOCOL_ID]: {
            label: "Library type",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.STARTING_MATERIAL]: {
            label: "Starting material",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.LIBRARY_DATE]: {
            label: "Library date",
            type: types.DATE,
            defaultValue: DEFAULT_DATE,
        },
        [fields.BIOANALYSER_PEAK]: {
            label: "Bioanalyser peak",
            type: types.TEXT,
            defaultValue: ""
        },
        [fields.FRAG_SIZE_MIN]: {
            label: "Frag.size(min)",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.FRAG_SIZE_MAX]: {
            label: "Frag.size(max)",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.CONCENTRATION]: {
            label: "Contentration",
            type: types.TEXT,
            defaultValue: "",
        },
        [fields.QUANTIF_METHOD_ID]: {
            label: "Quantification",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.MULTIPLEX_INDEX_7_ID]: {
            label: "Multiplex index (I7)",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.MULTIPLEX_INDEX_5_ID]: {
            label: "Multiplex index (I5)",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.VOLUME]: {
            label: "Volume",
            type: types.TEXT,
            defaultValue: "",
        },
        [fields.ADAPTER_ID]: {
            label: "Adapter",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.KITS_LOTS]: {
            label: "Illumina kits and lots",
            type: types.TEXT,
            defaultValue: "",
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: types.TEXT,
            defaultValue: "",
        },
        [fields.LIBRARY_STATE_ID]: {
            label: "Library state",
            type: types.DROPDOWN,
            defaultValue: -1,
        },
        [fields.COMMENT_CUSTOMER]: {
            label: "Internal comment",
            type: types.TEXTAREA,
            defaultValue: "",
        }
    },

    [formStoreKeys.PEOPLE_INSERT_FORM]: {
        [fields.FIRST_NAME]: {
            label: "First name",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.LAST_NAME]: {
            label: "Last name",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.EMAIL]: {
            label: "PI email",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.ADDRESS]: {
            label: "PI address",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.PHONE]: {
            label: "PI phone",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        }
    },

    [formStoreKeys.PROJECTS_INSERT_FORM]: {
        [fields.NAME]: {
            label: "Project name",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.PERSON_ID]: {
            label: "Laboratory",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.CODE_NAME]: {
            label: "Code name",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.DESCRIPTION]: {
            label: "Description",
            type: types.TEXT,
            defaultValue: "",
        },
        [fields.PROJECT_STATE_ID]: {
            label: "Project state",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.IS_CONTROL]: {
            label: "Control project",
            type: types.CHECKBOX,
            defaultValue: false,
        },
        [fields.USER_MEETING_DATE]: {
            label: "User meeting date",
            type: types.DATE,
            defaultValue: DEFAULT_DATE,
        },
        [fields.PROJECT_ANALYSIS_ID]: {
            label: "Project analysis",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: types.TEXTAREA,
            defaultValue: "",
        }
    },

    [formStoreKeys.SAMPLES_INSERT_FORM]: {
        [fields.NAME]: {
            label: "Name",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.SHORT_NAME]: {
            label: "Short name",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.PROJECT_ID]: {
            label: "Project",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.TAXO_ID]: {
            label: "Organism",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.SAMPLE_TYPE_ID]: {
            label: "Sample type",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.RECEIVED_DATE]: {
            label: "Received date",
            type: types.DATE,
            defaultValue: DEFAULT_DATE,
        },
        [fields.QUANTIF_METHOD_ID]: {
            label: "Quantification",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.CONCENTRATION]: {
            label: "Concentration",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.VOLUME]: {
            label: "Volume",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.RIN]: {
            label: "RIN",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.RATIO_260_280]: {
            label: "Ratio 260/280",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.RATIO_260_230]: {
            label: "Ratio 260/230",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.DESCRIPTION]: {
            label: "Description",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: types.TEXT,
            defaultValue: "",
        },
        [fields.COMMENT_CUSTOMER]: {
            label: "Internal comment",
            type: types.TEXTAREA,
            defaultValue: "",
        },
        [fields.IS_TRASHED]: {
            label: "Discarded",
            type: types.CHECKBOX,
            defaultValue: false,
        }
    },

    [formStoreKeys.RUNS_INSERT_FORM]: {
        // ......
    },

    [formStoreKeys.USER_REQUESTS_INSERT_FORM]: {
        [fields.PROJECT_ID]: {
            label: "Project",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.SAMPLE_ID]: {
            label: "Sample",
            type: types.SEC_DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.INSERT_SIZE_MIN]: {
            label: "Insert size min",
            type: types.TEXT,
            defaultValue: "",
        },
        [fields.INSERT_SIZE_MAX]: {
            label: "Insert size max",
            type: types.TEXT,
            defaultValue: "",
        },
        [fields.LIB_PROTOCOL_ID]: {
            label: "Library type",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.MULTIPLEXING_GROUP]: {
            label: "Multiplexing group",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.RUN_TYPES_LENGTH_ID]: {
            label: "Run type",
            type: types.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.NB_LANES]: {
            label: "Nb of lanes",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.MILLION_READS]: {
            label: "Multiplex#",
            type: types.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.WITH_LIB_QC]: {
            label: "is QC",
            type: types.CHECKBOX,
            defaultValue: false,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: types.TEXTAREA,
            defaultValue: "",
        },
        [fields.IS_TRASHED]: {
            label: "Discarded",
            type: types.CHECKBOX,
            defaultValue: false,
        },
        [fields.IS_FULFILLED]: {
            label: "DONE",
            type: types.CHECKBOX,
            defaultValue: false,
        }
    },
};


export default facilityDataModels;

