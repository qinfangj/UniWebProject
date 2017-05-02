"use strict";
import { combineForms } from  'react-redux-form';
import runsModel from '../../../../components/forms/facilityData/Runs/runsModel';


function initialize() {
    let initialData = {};
    for (let field of Object.keys(runsModel)) {
        initialData[field] = runsModel[field].value;
    }
    return initialData;
}


/**
 * React-redux-forms reducer - Initial form data for Runs insert.
 */
let runsFormReducers = combineForms(
    {
        runs: initialize(),
    },
    "runsForm"
);

export default runsFormReducers;

