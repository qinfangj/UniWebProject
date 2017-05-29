"use strict";

/*
 * Identifiers for input fields.
 * N.B. The closer they are to Slick row fields, the easier,
 * otherwise we would need exceptions in the reducer that treats form updates.
 */


const fields = {

    alignments: {
        ANALYSIS_TYPE_ID: "analysisTypeId",
        RUN_ID: "runId",
        BASECALLING_ID: "basecallingId",
        MAPPING_TOOL_ID: "mappingToolId",
        ELAND_OUTPUT_DIR: "elandOutputDir",
        HAS_QC_PDFS: "hasqcpdfs",
        CONFIG_FILE_CONTENT: "configFileContent",
        COMMENT: "comment",
    },

    basecallings: {
        RUN_ID: "runId",
        PIPELINE_VERSION_ID: "pipelineVersionId",
        ANALYSIS_TYPE_ID: "analysisTypeId",
        CONTROL_LANE_NB: "controlLaneNb",
        UNALIGNED_OUTPUT_DIR: "outputDir",
        IS_DEMULTIPLEXING:"isdemultiplexingAnalysis",
        COMMENT: "comment",
    },

    bioanalysers: {
        BIOANALYSER_FILE: "bioanalyserFile",
        BIOANALYSER_FILENAME: "filename",
        BIOANALYSER_DATE: "bioanalyserDate",
        DESCRIPTION: "description",
    },

    genomes: {
        TAXO_ID: "taxoId",
        ASSEMBLY: "assembly",
        GENOME_FOLDER: "genomeFolder",
        URL: "url",
        DOWNLOADED_DATE: "downloadedDate",
        FILES: "files",
        COMMENT: "comment",
        IS_MASKED: "ismasked",
        IS_ARCHIVED: "isarchived",
    },

    libraries: {
        PROJECT_ID: "projectId",
        SAMPLE_ID: "sampleId",
        NAME: "name",
        LIB_PROTOCOL_ID: "libProtocolId",
        STARTING_MATERIAL: "startingMaterial",
        LIBRARY_DATE: "libraryDate",
        BIOANALYSER_PEAK:  "bioanalyserPeak",
        FRAG_SIZE_MIN: "fragSizeMin",
        FRAG_SIZE_MAX: "fragSizeMax",
        CONCENTRATION: "concentration",
        QUANTIF_METHOD_ID: "quantifMethodId",
        MULTIPLEX_INDEX_7_ID: "multiplexIndexId",
        MULTIPLEX_INDEX_5_ID: "index5primeId",
        VOLUME: "volume",
        ADAPTER_ID: "adapterId",
        KITS_LOTS: "kitsLots",
        COMMENT_CUSTOMER: "commentCustomer",
        LIBRARY_STATE_ID: "libraryStateId",
        COMMENT: "comment",
        IS_CUSTOMER_MADE: "iscustomerMade",
        IS_ROBOT_MADE: "isRobot_made",
    },

    people: {
        FIRST_NAME: "firstName",
        LAST_NAME: "lastName",
        EMAIL: "email",
        ADDRESS: "address",
        PHONE: "phone",
    },

    projects: {
        NAME: "name",
        PERSON_ID: "personId",
        CODE_NAME: "codeName",
        DESCRIPTION: "description",
        PROJECT_STATE_ID: "projectStateId",
        USER_MEETING_DATE: "userMeetingDate",
        PROJECT_ANALYSIS_ID: "projectAnalysisId",
        IS_CONTROL: "iscontrol",
        COMMENT: "comment",
    },

    runs: {
        GA_RUN_NUMBER: "gaRunNb",
        FLOWCELL: "flowcellRefName",
        FLOWCELL_TYPE_ID: "flowcellTypeId",
        RELEASE_DATE: "releaseDate",
        INSTRUMENT_ID: "instrumentId",
        GA_RUN_DATE: "gaRunDate",
        RUN_TYPES_LENGTH_ID: "runTypesLengthId",
        FC_STAGE: "fcStage",
        SEQUENCING_KIT_VERSION_ID: "sequencingKitVersionId",
        IS_FAILED: "istrashed",
        COMMENT: "comment",
    },

    samples: {
        NAME: "name",
        SHORT_NAME: "shortName",
        PROJECT_ID: "projectId",
        TAXO_ID: "taxoId",
        SAMPLE_TYPE_ID: "sampleTypeId",
        RECEIVED_DATE: "receivedDate",
        QUANTIF_METHOD_ID: "quantifMethodId",
        CONCENTRATION: "concentration",
        VOLUME: "volume",
        RIN: "rin",
        RATIO_260_280: "ratio260280",
        RATIO_260_230: "",
        DESCRIPTION: "description",
        COMMENT_CUSTOMER: "commentCustomer",
        COMMENT: "comment",
        IS_TRASHED: "istrashed",
    },

    user_requests: {
        PROJECT_ID: "projectId",
        SAMPLE_ID: "sampleId",
        INSERT_SIZE_MIN: "insertSizeMin",
        INSERT_SIZE_MAX: "insertSizeMax",
        LIB_PROTOCOL_ID: "libProtocolId",
        MULTIPLEXING_GROUP: "multiplexingGroup",
        RUN_TYPES_LENGTH_ID: "runTypesLengthId",
        NB_LANES: "nbLanes",
        MILLION_READS: "millionReads",
        WITH_LIB_QC: "withLibQc",
        COMMENT: "comment",
        IS_TRASHED: "istrashed",
        IS_FULFILLED: "isfulfilled",
    },

    ADAPTER_ID: "adapterId",
    ADDRESS: "address",
    ANALYSIS_TYPE_ID: "analysisTypeId",
    ASSEMBLY: "assembly",
    BASECALLING_ID: "basecallingId",
    BIOANALYSER_DATE: "bioanalyserDate",
    BIOANALYSER_FILE: "bioanalyserFile",
    BIOANALYSER_PEAK:  "bioanalyserPeak",
    CLUSTER_DATE: "releaseDate",
    CODE_NAME: "codeName",
    COMMENT: "comment",
    COMMENT_CUSTOMER: "commentCustomer",
    CONCENTRATION: "concentration",
    CONFIG_FILE_CONTENT: "configFileContent",
    CONTROL_LANE_NB: "controlLaneNb",
    DESCRIPTION: "description",
    DOWNLOADED_DATE: "downloadedDate",
    ELAND_OUTPUT_DIR: "elandOutputDir",
    EMAIL: "email",
    FILES: "files",
    FIRST_NAME: "firstName",
    FLOWCELL_ID: "flowcellId",
    FLOWCELL_TYPE_ID: "flowcellTypeId",
    FRAG_SIZE_MIN: "fragSizeMin",
    FRAG_SIZE_MAX: "fragSizeMax",
    GA_RUN_DATE: "gaRunDate",
    GENOME_FOLDER: "genomeFolder",
    HAS_QC_PDFS: "hasqcpdfs",
    ID: "id",
    INSERT_SIZE_MIN: "insertSizeMin",
    INSERT_SIZE_MAX: "insertSizeMax",
    INSTRUMENT_ID: "instrumentId",
    IS_ARCHIVED: "isarchived",
    IS_CONTROL: "iscontrol",
    IS_CUSTOMER_MADE: "iscustomerMade",
    IS_DEMULTIPLEXING: "isdemultiplexingAnalysis",
    IS_FAILED: "istrashed",
    IS_FULFILLED: "isfulfilled",
    IS_MASKED: "ismasked",
    IS_ROBOT_MADE: "isRobot_made",
    IS_TRASHED: "istrashed",
    KITS_LOTS: "kitsLots",
    LANES: "lanes",
    LAST_NAME: "lastName",
    LIBRARY_DATE: "libraryDate",
    LIBRARY_ID: "libraryId",
    LIBRARY_STATE_ID: "libraryStateId",
    LIB_PROTOCOL_ID: "libProtocolId",
    MAPPING_TOOL_ID: "mappingToolId",
    MILLION_READS: "millionReads",
    MULTIPLEXING_GROUP: "multiplexingGroup",
    MULTIPLEX_INDEX_7_ID: "multiplexIndexId",
    MULTIPLEX_INDEX_5_ID: "index5primeId",
    NAME: "name",
    NB_LANES: "nbLanes",
    PERSON_ID: "personId",
    PROJECT_ID: "projectId",
    PROJECT_ANALYSIS_ID: "projectAnalysisId",
    PROJECT_STATE_ID: "projectStateId",
    PHONE: "phone",
    PIPELINE_VERSION_ID: "pipelineVersionId",
    POOL_ID: "poolId",
    QUALITY_ID: "qualityId",
    QUANTIF_METHOD_ID: "quantifMethodId",
    RATIO_260_280: "ratio260280",
    RATIO_260_230: "",
    RECEIVED_DATE: "receivedDate",
    RIN: "rin",
    RUN_ID: "runId",
    RUN_NUMBER: "gaRunNb",
    RUN_TYPES_LENGTH_ID: "runTypesLengthId",
    SAMPLE_ID: "sampleId",
    SAMPLE_TYPE_ID: "sampleTypeId",
    SHORT_NAME: "shortName",
    STAGE: "stage",
    STARTING_MATERIAL: "startingMaterial",
    SEQUENCING_KIT_VERSION_ID: "sequencingKitVersionId",
    TAXO_ID: "taxoId",
    TO_ANALYZE: "toanalyze",
    UNALIGNED_OUTPUT_DIR: "outputDir",
    USER_REQUEST_ID: "userRequestId",
    URL: "url",
    USER_MEETING_DATE: "userMeetingDate",
    VOLUME: "volume",
    WITH_LIB_QC: "withLibQc",
};

export default fields;