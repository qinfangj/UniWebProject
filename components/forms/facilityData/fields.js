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
    PERSON_ID: "personId",
    PROJECT_STATE_ID: "projectStateId",
    IS_CONTROL: "iscontrol",
    USER_MEETING_DATE: "userMeetingDate",
    PROJECT_ANALYSIS_ID: "projectAnalysisId",
    TO_ANALYZE: "toanalyze",

    // People
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    EMAIL: "email",
    ADDRESS: "address",
    PHONE: "phone",

    // Alignments
    ELAND_OUTPUT_DIR: "elandOutputDir",
    CONFIG_FILE_CONTENT: "configFileContent",

    // Basecallings
    CONTROL_LANE_NB: "controlLaneNb",
    IS_DEMULTIPLEXING:"isdemultiplexingAnalysis",
    UNALIGNED_OUTPUT_DIR: "outputDir",

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
    ADAPTER_ID: "adapterId",
    KITS_LOTS: "kitsLots",
    LIBRARY_STATE_ID: "libraryStateId",
    COMMENT_CUSTOMER: "commentCustomer",
    IS_CUSTOMER_MADE: "iscustomerMade",
    IS_ROBOT_MADE: "isrobotMade",

    // Samples
    SHORT_NAME: "shortName",
    RECEIVED_DATE: "receivedDate",
    RIN: "rin",
    RATIO_260_280: "ratio260280",
    RATIO_260_230: "",

    // User requests
    INSERT_SIZE_MIN: "insertSizeMin",
    INSERT_SIZE_MAX: "insertSizeMax",
    MULTIPLEXING_GROUP: "multiplexingGroup",
    NB_LANES: "nbLanes",
    MULTIPLEX_NB: "????",
    WITH_LIB_QC: "withLibQc",
    IS_FULFILLED: "isfulfilled",

    // Bioanalysers
    FILENAME: "filename",
    BIOANALYSER_DATE: "bioanalyserDate",


};

export default fields;