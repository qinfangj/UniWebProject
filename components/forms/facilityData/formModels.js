"use strict";
import fields from '../fields';
import formStoreKeys from '../../constants/formStoreKeys';


export const inputTypes = {
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
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
            valid: true,
        },
        [fields.RUN_ID]: {  // "runs_output_folders"
            label: "Run",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.BASECALLING_ID]: {  //"basecallings_output_folders",
            label: "Unaligned data output folder",
            type: inputTypes.SEC_DROPDOWN,
            defaultValue: -1,
            referenceField: fields.RUN_ID,
            required: true,
        },
        [fields.MAPPING_TOOL_ID]: {
            label: "Mapping tool",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.ELAND_OUTPUT_DIR]: {
            label: "Alignment output folder",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.HAS_QC_PDFS]: {
            label: "QC report",
            type: inputTypes.CHECKBOX,
            defaultValue: false,
        },
        [fields.CONFIG_FILE_CONTENT]: {
            label: "Config file content",
            type: inputTypes.TEXTAREA,
            defaultValue: "ANALYSIS xxx\nUSE_BASES xxx",
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: inputTypes.TEXTAREA,
            defaultValue: "",
        }
    },

    [formStoreKeys.BASECALLINGS_INSERT_FORM]: {
        [fields.RUN_ID]: {
            label: "Run",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.PIPELINE_VERSION_ID]: {
            label: "Pipeline version",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.ANALYSIS_TYPE_ID]: {
            label: "Analysis type",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.CONTROL_LANE_NB]: {
            label: "Control lane",
            type: inputTypes.DROPDOWN,
            defaultValue: 0,
        },
        [fields.IS_DEMULTIPLEXING]: {
            label: "Demultiplexing",
            type: inputTypes.CHECKBOX,
            defaultValue: false,
        },
        [fields.UNALIGNED_OUTPUT_DIR]: {
            label: "Unaligned data output folder",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: inputTypes.TEXTAREA,
            defaultValue: "",
        }
    },

    [formStoreKeys.BIOANALYSERS_INSERT_FORM]: {
        [fields.FILENAME]: {
            label: "Bioanalysers file",
            type: inputTypes.TEXT,
            defaultValue: null,
        },
        [fields.BIOANALYSER_DATE]: {
            label: "Bioanalyser date",
            type: inputTypes.DATE,
            defaultValue: DEFAULT_DATE,
        },
        [fields.DESCRIPTION]: {
            label: "Description",
            type: inputTypes.TEXT,
            defaultValue: "",
        },
        // sub-form
    },

    [formStoreKeys.GENOMES_INSERT_FORM]: {
        [fields.TAXO_ID]: {
            label: "Organism",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.ASSEMBLY]: {
            label: "Assembly",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.GENOME_FOLDER]: {
            label: "Genome folder",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.URL]: {
            label: "URL",
            type: inputTypes.TEXT,
            defaultValue: "http://",
            required: true,
        },
        [fields.DOWNLOADED_DATE]: {
            label: "Download date",
            type: inputTypes.DATE,
            defaultValue: DEFAULT_DATE,
        },
        [fields.FILES]: {
            label: "File names",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.IS_MASKED]: {
            label: "Masked",
            type: inputTypes.CHECKBOX,
            defaultValue: false,
        },
        [fields.IS_ARCHIVED]: {
            label: "Archived",
            type: inputTypes.CHECKBOX,
            defaultValue: false,
        }
    },

    [formStoreKeys.LIBRARIES_INSERT_FORM]: {
        [fields.PROJECT_ID]: {
            label: "Project",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.SAMPLE_ID]: {
            label: "Sample",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.NAME]: {
            label: "Name",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.LIB_PROTOCOL_ID]: {
            label: "Library type",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.STARTING_MATERIAL]: {
            label: "Starting material",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.LIBRARY_DATE]: {
            label: "Library date",
            type: inputTypes.DATE,
            defaultValue: DEFAULT_DATE,
        },
        [fields.BIOANALYSER_PEAK]: {
            label: "Bioanalyser peak",
            type: inputTypes.TEXT,
            defaultValue: ""
        },
        [fields.FRAG_SIZE_MIN]: {
            label: "Frag.size(min)",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.FRAG_SIZE_MAX]: {
            label: "Frag.size(max)",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.CONCENTRATION]: {
            label: "Contentration",
            type: inputTypes.TEXT,
            defaultValue: "",
        },
        [fields.QUANTIF_METHOD_ID]: {
            label: "Quantification",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.MULTIPLEX_INDEX_7_ID]: {
            label: "Multiplex index (I7)",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.MULTIPLEX_INDEX_5_ID]: {
            label: "Multiplex index (I5)",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.VOLUME]: {
            label: "Volume",
            type: inputTypes.TEXT,
            defaultValue: "",
        },
        [fields.ADAPTER_ID]: {
            label: "Adapter",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.KITS_LOTS]: {
            label: "Illumina kits and lots",
            type: inputTypes.TEXT,
            defaultValue: "",
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: inputTypes.TEXT,
            defaultValue: "",
        },
        [fields.LIBRARY_STATE_ID]: {
            label: "Library state",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
        },
        [fields.COMMENT_CUSTOMER]: {
            label: "Internal comment",
            type: inputTypes.TEXTAREA,
            defaultValue: "",
        }
    },

    [formStoreKeys.PEOPLE_INSERT_FORM]: {
        [fields.FIRST_NAME]: {
            label: "First name",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.LAST_NAME]: {
            label: "Last name",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.EMAIL]: {
            label: "PI email",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.ADDRESS]: {
            label: "PI address",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.PHONE]: {
            label: "PI phone",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        }
    },

    [formStoreKeys.PROJECTS_INSERT_FORM]: {
        [fields.NAME]: {
            label: "Project name",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.PERSON_ID]: {
            label: "Laboratory",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.CODE_NAME]: {
            label: "Code name",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.DESCRIPTION]: {
            label: "Description",
            type: inputTypes.TEXT,
            defaultValue: "",
        },
        [fields.PROJECT_STATE_ID]: {
            label: "Project state",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.IS_CONTROL]: {
            label: "Control project",
            type: inputTypes.CHECKBOX,
            defaultValue: false,
        },
        [fields.USER_MEETING_DATE]: {
            label: "User meeting date",
            type: inputTypes.DATE,
            defaultValue: DEFAULT_DATE,
        },
        [fields.PROJECT_ANALYSIS_ID]: {
            label: "Project analysis",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: inputTypes.TEXTAREA,
            defaultValue: "",
        }
    },

    [formStoreKeys.SAMPLES_INSERT_FORM]: {
        [fields.NAME]: {
            label: "Name",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.SHORT_NAME]: {
            label: "Short name",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.PROJECT_ID]: {
            label: "Project",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.TAXO_ID]: {
            label: "Organism",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.SAMPLE_TYPE_ID]: {
            label: "Sample type",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.RECEIVED_DATE]: {
            label: "Received date",
            type: inputTypes.DATE,
            defaultValue: DEFAULT_DATE,
        },
        [fields.QUANTIF_METHOD_ID]: {
            label: "Quantification",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.CONCENTRATION]: {
            label: "Concentration",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.VOLUME]: {
            label: "Volume",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.RIN]: {
            label: "RIN",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.RATIO_260_280]: {
            label: "Ratio 260/280",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.RATIO_260_230]: {
            label: "Ratio 260/230",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.DESCRIPTION]: {
            label: "Description",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: inputTypes.TEXT,
            defaultValue: "",
        },
        [fields.COMMENT_CUSTOMER]: {
            label: "Internal comment",
            type: inputTypes.TEXTAREA,
            defaultValue: "",
        },
        [fields.IS_TRASHED]: {
            label: "Discarded",
            type: inputTypes.CHECKBOX,
            defaultValue: false,
        }
    },

    [formStoreKeys.RUNS_INSERT_FORM]: {
        // ......
    },

    [formStoreKeys.USER_REQUESTS_INSERT_FORM]: {
        [fields.PROJECT_ID]: {
            label: "Project",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.SAMPLE_ID]: {
            label: "Sample",
            type: inputTypes.SEC_DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.INSERT_SIZE_MIN]: {
            label: "Insert size min",
            type: inputTypes.TEXT,
            defaultValue: "",
        },
        [fields.INSERT_SIZE_MAX]: {
            label: "Insert size max",
            type: inputTypes.TEXT,
            defaultValue: "",
        },
        [fields.LIB_PROTOCOL_ID]: {
            label: "Library type",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.MULTIPLEXING_GROUP]: {
            label: "Multiplexing group",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.RUN_TYPES_LENGTH_ID]: {
            label: "Run type",
            type: inputTypes.DROPDOWN,
            defaultValue: -1,
            required: true,
        },
        [fields.NB_LANES]: {
            label: "Nb of lanes",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.MILLION_READS]: {
            label: "Multiplex#",
            type: inputTypes.TEXT,
            defaultValue: "",
            required: true,
        },
        [fields.WITH_LIB_QC]: {
            label: "is QC",
            type: inputTypes.CHECKBOX,
            defaultValue: false,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: inputTypes.TEXTAREA,
            defaultValue: "",
        },
        [fields.IS_TRASHED]: {
            label: "Discarded",
            type: inputTypes.CHECKBOX,
            defaultValue: false,
        },
        [fields.IS_FULFILLED]: {
            label: "DONE",
            type: inputTypes.CHECKBOX,
            defaultValue: false,
        }
    },
};


export default facilityDataModels;

