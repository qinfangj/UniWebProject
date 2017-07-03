"use strict";
import React from 'react';
import css from './styles.css';
import inputTypes from '../forms/inputTypes';
import { Control } from 'react-redux-form';
import { dateNow } from '../../utils/time';
import fields from '../constants/fields';


/**
 * Build a list of <option>s based on an array representing the different options for a select input.
 * @param options: array [[id, label], ...] to become <option value={id}>{label}</option>.
 * @returns {Array}
 */
function makeOptions(options) {
    let opts = options ? options.map((v,i) => <option value={v[0]} key={i}>{v[1]}</option>) : [];
    opts.unshift(<option value="" key="-">-</option>);
    return opts;
}


/**
 * Make an array of inputs of the correct type, based on the form model.
 * @param model: RRF model of a row.
 * @param modelName: RRF form model name, to connect inputs.
 * @param k: the row index, to link an input to its row.
 * @returns {Array}
 */
export function makeInputs(rowModel, options, formModelName) {
    let inputs = [];
    for (let field of Object.keys(rowModel)) {
        let model = rowModel[field];
        let {inputType, label, optionsKey, ...props} = model;
        let modelName = `${formModelName}.${field}`;
        let input;
        switch(inputType) {
            case inputTypes.TEXT:
                input = <Control.text className={css.textInput} model={modelName} updateOn="blur" ignore={['focus']} {...props} />; break;
            case inputTypes.NUMBER:
                input = <Control.input className={css.numInput} model={modelName} type="number" updateOn="blur" ignore={['focus']} {...props} />; break;
            case inputTypes.DATE:
                input = <Control.input className={css.dateInput} model={modelName} type="date" updateOn="change" ignore={['focus','blur']} {...props} />; break;
            case inputTypes.CHECKBOX:
                input = <Control.checkbox className={css.checkbox} model={modelName} updateOn="change" ignore={['focus','blur']} style={{marginLeft: '14px'}} {...props} />; break;
            case inputTypes.DROPDOWN:
                input = (
                    <div className={css.selectWrapper}>
                        <Control.select className={css.selectInput} model={modelName} updateOn="change" ignore={['focus','blur']} {...props} >
                            {makeOptions(options[model.optionsKey])}
                        </Control.select>
                    </div>
                ); break;
            default:
                break;
        }

        inputs.push(input);

    }
    return inputs;
}


export function newLibrariesProjectRow() {
    return {
        [fields.libraries.PROJECT_ID]: "1",
        [fields.samples.TAXO_ID]: "1",
        [fields.samples.SAMPLE_TYPE_ID]: "1",  // "Material type"
        [fields.libraries.LIB_PROTOCOL_ID]: "1",
        [fields.libraries.ADAPTER_ID]: "1",
        [fields.libraries.LIBRARY_DATE]: dateNow(),
        [fields.libraries.QUANTIF_METHOD_ID]: "1",
        [fields.user_requests.RUN_TYPES_LENGTH_ID]: "1",
    }
}

export function newLibraryRow() {
    return {
        [fields.samples.NAME]: "12",
        [fields.samples.SHORT_NAME]: "12",
        [fields.libraries.STARTING_MATERIAL]: "12",
        [fields.libraries.MULTIPLEX_INDEX_7_ID]: "12",
        [fields.libraries.MULTIPLEX_INDEX_5_ID]: "12",
        [fields.libraries.FRAG_SIZE_MIN]: "12",
        [fields.libraries.FRAG_SIZE_MAX]: "12",
        [fields.libraries.BIOANALYSER_PEAK]: "12",
        [fields.libraries.CONCENTRATION]: "12",
        [fields.libraries.VOLUME]: "12",
        [fields.libraries.IS_ROBOT_MADE]: "12",
        [fields.libraries.COMMENT_CUSTOMER]: "12",
        [fields.user_requests.NB_LANES]: "12",
        [fields.user_requests.MILLION_READS]: "12",
        [fields.user_requests.MULTIPLEXING_GROUP]: "12",
    };
}

export function newSamplesProjectRow() {
    return {
        [fields.samples.PROJECT_ID]: "1",
        [fields.samples.TAXO_ID]: "1",
        [fields.samples.SAMPLE_TYPE_ID]: "1",
        [fields.samples.RECEIVED_DATE]: dateNow(),
        [fields.samples.QUANTIF_METHOD_ID]: "1",
        [fields.user_requests.LIB_PROTOCOL_ID]: "1",  // "Library type"
        [fields.user_requests.RUN_TYPES_LENGTH_ID]: "1",
    }
}

export function newSampleRow() {
    return {
        [fields.samples.NAME]: "12",
        [fields.samples.SHORT_NAME]: "12",
        [fields.samples.CONCENTRATION]: "12",
        [fields.samples.VOLUME]: "12",
        [fields.samples.RIN]: "12",
        [fields.samples.RATIO_260_280]: "12",
        [fields.samples.RATIO_260_230]: "12",
        [fields.samples.DESCRIPTION]: "12",
        [fields.samples.COMMENT_CUSTOMER]: "12",
        [fields.user_requests.INSERT_SIZE_MIN]: "12",
        [fields.user_requests.INSERT_SIZE_MAX]: "12",
        [fields.user_requests.NB_LANES]: "12",
        [fields.user_requests.MILLION_READS]: "12",
        [fields.user_requests.MULTIPLEXING_GROUP]: "12",
    };
}


