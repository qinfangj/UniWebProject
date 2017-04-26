"use strict";
import { combineForms } from  'react-redux-form'

let bioanalysersFormReducers = combineForms(
    {
        insertForm: {
                filename: null,
                bioanalyserDate: "1970-01-01",
                description: "",
        }

    },'bioanalysersForms'
 );


export default bioanalysersFormReducers;