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
    let newState;

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

        /**
         * Expects action.laneNb, action.libIndex, action.nbLibs.
         */
        case types.options.REMOVE_LIB_FROM_RUNS:
            newState = {...state};
            let k = action.libIndex;
            let laneNb = action.laneNb;
            let nbLibs = action.nbLibs;
            let p = `facilityDataForms.runs.lanes[${laneNb}].libs`;
            /* Copy the value of lib at index J to index J-1, i.e. rename with J-1 instead of J,
             * for all indexes above the one we delete. */
            for (let j=k+1; j < nbLibs; j++) {
                newState[p + `[${j-1}].projectId`] = state[p + `[${j}].projectId`];
            }
            /* Delete the last one, now that we have shifted everything down one step. */
            delete newState[p + `[${nbLibs-1}]`];
            return newState;

        default:
            return state;
    }
};


export default secondaryOptionsReducers;

