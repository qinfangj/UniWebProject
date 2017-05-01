"use strict";
import fields from '../../fields';
import formNames from '../../../constants/formNames';
import { dateNow } from '../../../../utils/time';
import inputTypes from '../../inputTypes';
import { DEFAULT_DATE } from '../../inputTypes';



const lanesModel = {
    [fields.RUN_NUMBER]: {
        width: 1,
        label: "Run#",
        type: inputTypes.TEXT,
        value: "",
        required: true,
    },

};

export default lanesModel;