/*
 * Identifiers for input fields.
 * N.B. The closer they are to Slick row fields, the easier,
 * otherwise we would need exceptions in the reducer that treats form updates.
 */


const fields = {
    ID: "id",
    NAME: "name",
    DESCRIPTION: "description",
    COMMENT: "comment",
    IS_TRASHED: "istrashed",

    // Projects
    CODE_NAME: "codeName",
    USER_MEETING_DATE: "userMeetingDate",
    IS_CONTROL: "iscontrol",
    TO_ANALYZE: "toanalyze",
    PERSON_ID: "personId",
    PROJECT_ANALYSIS_ID: "projectAnalysisId",
    PROJECT_STATE_ID: "projectStateId",

    // People
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    EMAIL: "email",
    ADDRESS: "address",
    PHONE: "phone",

    // Alignments
    ELAND_OUTPUT_DIR: "elandOutputDir",
    CONFIG_FILE_CONTENT: "configFileContent",
    BASECALLING_ID: "basecallingId",

    // Basecallings
    CONTROL_LANE_NB: "controlLaneNb",
    IS_DEMULTIPLEXING:"isdemultiplexingAnalysis",
    UNALIGNED_OUTPUT_DIR: "outputDir",
    RUN_ID: "runId",

    // Genomes
    ASSEMBLY: "assembly",
    URL: "url",
    GENOME_FOLDER: "genomeFolder",
    DOWNLOADED_DATE: "downloadedDate",
    FILES: "files",
    IS_MASKED: "ismasked",
    IS_ARCHIVED: "isarchived",

    // Libraries
    STARTING_MATERIAL: "startingMaterial",
    LIBRARY_DATE: "libraryDate",
    BIOANALYSER_PEAK:  "bioanalyserPeak",
    FRAG_SIZE_MIN: "fragSizeMin",
    FRAG_SIZE_MAX: "fragSizeMax",
    CONCENTRATION: "concentration",
    QUANTIF_METHOD_ID: "quantifMethodId",
    VOLUME: "volume",
    KITS_LOTS: "kitsLots",
    COMMENT_CUSTOMER: "commentCustomer",
    IS_CUSTOMER_MADE: "iscustomerMade",
    IS_ROBOT_MADE: "isrobotMade",
    ADAPTER_ID: "adapterId",
    MULTIPLEX_INDEX_ID: "multiplexIndexId",
    LIBRARY_STATE_ID: "libraryStateId",
    LIB_PROTOCOL_ID: "libProtocolId",
    SAMPLE_ID: "sampleId",

    // Samples
    SHORT_NAME: "shortName",
    RECEIVED_DATE: "receivedDate",
    RIN: "rin",
    RATIO_260_280: "ratio260280",
    RATIO_260_230: "",
    TAXO_ID: "taxoId",
    PROJECT_ID: "projectId",
    SAMPLE_TYPE_ID: "sampleTypeId",


    // User requests
    INSERT_SIZE_MIN: "insertSizeMin",
    INSERT_SIZE_MAX: "insertSizeMax",
    MULTIPLEXING_GROUP: "multiplexingGroup",
    NB_LANES: "nbLanes",
    MILLION_READS: "millionReads",
    WITH_LIB_QC: "withLibQc",
    IS_FULFILLED: "isfulfilled",
    RUN_TYPES_LENGTH_ID: "runTypesLengthId",


    // Bioanalysers
    FILENAME: "filename",
    BIOANALYSER_DATE: "bioanalyserDate",
    PIPELINE_VERSION_ID: "pipelineVersionId",
    ANALYSIS_TYPE_ID: "analysisTypeId",

    // Runs
    INSTRUMENT_ID: "instrumentId",
    SEQUENCING_KIT_VERSION_ID: "sequencingKitVersionId",
    FLOWCELL_TYPE_ID: "flowcellTypeId",
    MAPPING_TOOL_ID: "mappingToolId",
    QUALITY_ID: "qualityId",

};

export default fields;