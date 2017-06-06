"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators2';


const projectsModel = {
    [fields.projects.NAME]: {
        width: 4,
        label: "Project name",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.projects.PERSON_ID]: {
        width: 4,
        label: "Person in charge",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.LABORATORIES,
        required: true,
    },
    [fields.projects.CODE_NAME]: {
        width: 4,
        label: "Code name",
        inputType: inputTypes.TEXT,
        required: true,
        // validator = {validators.codeNameValidator}
        placeholder: "[name]_[initials] Ex: Tcells_EG."
    },
    [fields.projects.DESCRIPTION]: {
        width: 12,
        label: "Description",
        inputType: inputTypes.TEXT,
        //validator = {validators.descriptionValidator}
    },
    [fields.projects.PROJECT_STATE_ID]: {
        width: 4,
        label: "Project state",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PROJECT_STATES,
        required: true,
    },
    [fields.projects.USER_MEETING_DATE]: {
        width: 4,
        label: "User meeting date",
        inputType: inputTypes.DATE,
        required: true,
    },
    [fields.projects.PROJECT_ANALYSIS_ID]: {
        width: 4,
        label: "Project analysis",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.projects.IS_CONTROL]: {
        width: 4,
        label: "Control project",
        inputType: inputTypes.CHECKBOX,
    },
    [fields.projects.COMMENT]: {
        width: 12,
        label: "Comment",
        inputType: inputTypes.TEXTAREA,
    },
};


export default projectsModel;