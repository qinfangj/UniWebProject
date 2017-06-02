"use strict";
import { combineForms } from  'react-redux-form'
import { dateNow } from '../../../../utils/time';
import fields from '../../../constants/fields';
import { newLibraryRow, newSampleRow } from '../../../userData/helpers';


/**
 * React-redux-forms reducer - Initial form data for facilityData.
 */
let userDataReducers = combineForms(
    {
        libraries: [
            newLibraryRow(),
        ],
        samples: [
            newSampleRow(),
        ],
    },

    'userData'
);


export default userDataReducers;

