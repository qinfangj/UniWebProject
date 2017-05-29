"use strict";
import React from 'react';
import css from './styles.css';
import inputTypes from '../forms/inputTypes';
import { Control } from 'react-redux-form';
import { dateNow } from '../../utils/time';


/**
 * Build a list of <option>s based on an array representing the different options for a select input.
 * @param options: array [[id, label], ...] to become <option value={id}>{label}</option>.
 * @returns {Array}
 */
function makeOptions(options) {
    return options ? options.map((v,i) => <option value={v[0]} key={i}>{v[1]}</option>) : [];
}


/**
 * Make an array of inputs of the correct type, based on the form model.
 * @param model: RRF model of a row.
 * @param modelName: RRF form model name, to connect inputs.
 * @param k: the row index, to link an input to its row.
 * @returns {Array}
 */
export function makeInputs(rowModel, options, formModelName, k) {
    let inputs = [];
    for (let field of Object.keys(rowModel)) {
        let model = rowModel[field];
        let modelName = `${formModelName}[${k}].${field}`;
        let input;
        let props = {
            updateOn: "blur",
        };

        switch(model.inputType) {
            case inputTypes.TEXT:
                input = <Control.text className={css} model={modelName} {...props} />; break;
            case inputTypes.NUMBER:
                input = <Control.input model={modelName} type="number" {...props} />; break;
            case inputTypes.DATE:
                input = <Control.input model={modelName} type="date" {...props} />; break;
            case inputTypes.CHECKBOX:
                input = <Control.checkbox model={modelName} />; break;
            case inputTypes.DROPDOWN:
                input = (
                    <div style={{overflow: 'hidden', marginRight: '2px'}}>
                    <Control.select model={modelName} {...props}>
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


export function newEmptyRow() {
    return {
        project: "",
        sampleName: "",
        shortName: "",
        organism: "",
        startingMaterial: "",
        materialType: "",
        libraryProtocol: "",
        adapters: "",
        libraryDate: dateNow(),
        multiplexIndex7: "",
        secondIndex5: "",
        minFragSize: "",
        maxFragSize: "",
        bioanalyserPeak: "",
        concentration: "",
        volume: "",
        quantifMethod: "",
        isrobotMade: "",
        comment: "",
        readTypesLengths: "",
        nbLanes: "",
        multiplexNb: "",
        multiplexingGroup: "",
    };
}
