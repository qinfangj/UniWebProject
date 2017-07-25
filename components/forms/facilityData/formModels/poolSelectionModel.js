"use strict";
import formNames from '../../../constants/formNames';
import inputTypes from '../../../constants/inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';


/**
 * The sub-form in Runs to insert a pool of libraries.
 */
const poolSelectionModel = {
    projectIdWithPool: {
        name: "projectIdWithPool",
        width: 4,
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PROJECTS_HAVING_A_POOL,
        required: true,
    },
    pool: {
        name: "pool",
        width: 4,
        inputType: inputTypes.SEC_DROPDOWN,
        optionsKey: optionsStoreKeys.POOLS_FOR_PROJECT,
        required: true,
    },
};


export default poolSelectionModel;

