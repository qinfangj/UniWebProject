"use strict";
import { combineForms } from  'react-redux-form'
// import { dateNow } from '../../../../utils/time';
import { initializeRunsReducers } from '../../../../components/forms/facilityData/Runs/runsModel';


/**
 * React-redux-forms reducer - Initial form data for facilityData.
 */
let facilityDataFormsReducers = combineForms(
    {
        runs: initializeRunsReducers(),
        // bioanalysers: {
        //     filename: null,
        //     bioanalyserDate: "1970-01-01",
        //     description: "",
        // },
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

