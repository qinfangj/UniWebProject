"use strict";
import types from '../../actionTypes';
import returnList from '../base';


const defaultState = {};

function formatLibrariesForProject(v) { return [v.id, v.name]; }
function formatSamplesForProject(v) { return [v.id, v.name + (v.shortName ? " ("+v.shortName+")" : "")]; }
function formatPoolsForProject(v) { return [v.id, v.pool]; }
function formatBasecallingsForRun(v) { return [v.id, v.outputDir]; }

/**
 * Store select options lists that depend on another field's value.
 * Expects action.refModelName, the RRF model name of the reference field.
 * The list of options is then `store.secondaryOptions[reModelName]`.
 */
let secondaryOptionsReducers = (state = defaultState, action) => {

    let ref;

    switch (action.type) {

        case types.options.OPTIONS_LIBRAIRIES_FOR_PROJECT:
            ref = action.args.refModelName;
            return returnList(action, state, ref, [], formatLibrariesForProject);

        case types.options.OPTIONS_POOLS_FOR_PROJECT:
            ref = action.args.refModelName;
            return returnList(action, state, ref, [], formatPoolsForProject);

        case types.options.OPTIONS_SAMPLES_FOR_PROJECT:
            ref = action.args.refModelName;
            return returnList(action, state, ref, [], formatSamplesForProject);

        case types.options.OPTIONS_BASECALLINGS_FOR_RUN:
            ref = action.args.refModelName;
            return returnList(action, state, ref, [], formatBasecallingsForRun);

        default:
            return state;
    }
};


export default secondaryOptionsReducers;

