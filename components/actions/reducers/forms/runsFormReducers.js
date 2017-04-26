"use strict";
import { combineForms } from  'react-redux-form'
import { dateNow } from '../../../../utils/time';

let runsFormReducers = combineForms(
    {
        insertForm: {
            runNb: "",
            flowcellId: "",
            flowcellTypeId: "",
            clusterDate: dateNow(),
            instrument: "",
            runDate: dateNow(),
            runTypesLengths: "",
            stage: "",
            kit: "",
            isFailed: false,
            comment: ""
        }

    },'runsForms'
);


export default runsFormReducers;
