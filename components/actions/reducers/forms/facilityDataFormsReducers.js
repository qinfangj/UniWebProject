"use strict";
import { combineForms } from  'react-redux-form'
import { dateNow } from '../../../../utils/time';
import fields from '../../../forms/fields';


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

        runs: {
            [fields.runs.GA_RUN_NUMBER]: "",
            [fields.runs.FLOWCELL]: "",
            [fields.runs.FLOWCELL_TYPE_ID]: "",
            [fields.runs.RELEASE_DATE]: dateNow(),
            [fields.runs.INSTRUMENT_ID]: "",
            [fields.runs.GA_RUN_DATE]: dateNow(),
            [fields.runs.RUN_TYPES_LENGTH_ID]: "",
            [fields.runs.FC_STAGE]: "",
            [fields.runs.SEQUENCING_KIT_VERSION_ID]: "",
            [fields.runs.IS_FAILED]: false,
            [fields.runs.COMMENT]: "",
            lanes: {
                1: {
                    comment: "",
                    libs: [
                        {
                            projectId: "",
                            libraryId: "",
                            concentration: "",
                            qualityId: 1,
                            isQCLib: false,
                        },
                    ]
                }
            },
            poolSelection: {
                projectIdWithPool: "",
                poolId: "",
            }
        },
    },

    'facilityDataForms'
);


export default facilityDataFormsReducers;

