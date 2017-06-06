"use strict";
import { combineForms } from  'react-redux-form'
import { newLibraryRow, newLibrariesProjectRow, newSampleRow, newSamplesProjectRow } from '../../../userData/helpers';


/**
 * React-redux-forms reducer - Initial form data for facilityData.
 */
let userDataFormsReducers = combineForms(
    {
        libraries: {
            project: newLibrariesProjectRow,
            requests: [
                newLibraryRow(),
            ],
        },

        samples: {
            project: newSamplesProjectRow(),
            requests: [
                newSampleRow(),
            ],
        }
    },

    'userDataForms'
);


export default userDataFormsReducers;

