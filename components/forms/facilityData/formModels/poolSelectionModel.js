"use strict";
import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';


const poolSelectionModel = {
    "projectIdWithPool": {
        width: 4,
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PROJECTS_HAVING_A_POOL,
        required: true,
    },
    "pool": {
        width: 4,
        inputType: inputTypes.SEC_DROPDOWN,
        optionsKey: optionsStoreKeys.POOLS_FOR_PROJECT,
        required: true,
    },
};


export default poolSelectionModel;

