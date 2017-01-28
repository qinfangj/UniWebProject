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

};

export default fields;