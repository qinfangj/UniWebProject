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

    CODE_NAME: "codeName",
    PERSON_ID: "personId",
    PROJECT_STATE_ID: "projectStateId",
    IS_CONTROL: "iscontrol",
    USER_MEETING_DATE: "userMeetingDate",
    PROJECT_ANALYSIS_ID: "projectAnalysisId",
    TO_ANALYZE: "toanalyze",

    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    EMAIL: "email",
    ADDRESS: "address",
    PHONE: "phone",
};

export default fields;