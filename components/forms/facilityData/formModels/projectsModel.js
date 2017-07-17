"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators';


const projectsModel = {
    fields: [
        {
            name: fields.projects.NAME,
            width: 4,
            label: "Project name",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.projects.PERSON_ID,
            width: 4,
            label: "Person in charge",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.LABORATORIES,
            required: true,
        },{
            name: fields.projects.CODE_NAME,
            width: 4,
            label: "Code name",
            inputType: inputTypes.TEXT,
            validators: {codeName: validators.codeNameValidator},
            errorMessages: {codeName: "[name]_[initials] Ex: Tcells_EG."},
            placeholder: "[name]_[initials] Ex: Tcells_EG.",
            required: true,
        },{
            name: fields.projects.DESCRIPTION,
            width: 12,
            label: "Description",
            inputType: inputTypes.TEXT,
            validators: {desc: validators.descriptionValidator},
            errorMessages: {desc: "Description must be at least 3 words."},
            required: true,
        },{
            name: fields.projects.PROJECT_STATE_ID,
            width: 4,
            label: "Project state",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.PROJECT_STATES,
            required: true,
        },{
            name: fields.projects.USER_MEETING_DATE,
            width: 4,
            label: "User meeting date",
            inputType: inputTypes.DATE,
        },{
            name: fields.projects.PROJECT_ANALYSIS_ID,
            width: 4,
            label: "Project analysis",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.projects.IS_CONTROL,
            width: 4,
            label: "Control project",
            inputType: inputTypes.CHECKBOX,
        },{
            name: fields.projects.COMMENT,
            width: 12,
            label: "Comment",
            inputType: inputTypes.TEXTAREA,
        }
    ],
    model: "projects"
};


export default projectsModel;
