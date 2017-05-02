"use strict";
import { combineForms } from  'react-redux-form'
import { dateNow } from '../../../../utils/time';
import runsModel from '../../../../components/forms/facilityData/Runs/runsModel';



function initialize() {
    let initialData = {};
    for (let field of Object.keys(runsModel)) {
        initialData[field] = runsModel[field].initValue;
    }
    return initialData;
}


/**
 * React-redux-forms reducer - Initial form data for facilityData.
 */
let facilityDataFormsReducers = combineForms(
    {
        // bioanalysers: {
        //     filename: null,
        //     bioanalyserDate: "1970-01-01",
        //     description: "",
        // },
        runs: initialize(),
        // runs: {
        //     runNb: "",
        //     flowcellId: "",
        //     flowcellTypeId: "",
        //     clusterDate: dateNow(),
        //     instrument: "",
        //     runDate: dateNow(),
        //     runTypesLengths: "",
        //     stage: "",
        //     kit: "",
        //     isFailed: false,
        //     comment: ""
        // },

    },
    'facilityDataForms'
);


export default facilityDataFormsReducers;

