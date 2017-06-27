"use strict";
import types from '../actionTypes';
import RestService from '../../../utils/RestService';
import { asyncAction } from './base';
import optionsStoreKeys from '../../constants/optionsStoreKeys';



/**
 * Calls /table/:table/secondaryList/:ids
 */
function requestSecondaryOptionsListAsync(actionType, tableName, refModelName, id) {
    return asyncAction(actionType, RestService.getSecondaryOptionsList.bind(null, tableName, id), {refModelName});
}


/**
 * @param id: The id of the reference project
 * @param refModelName: The name of the reference field (projects selection)
 */
export function requestLibrariesForProject(refModelName, id) {
    return requestSecondaryOptionsListAsync(types.options.OPTIONS_LIBRAIRIES_FOR_PROJECT, "libraries", refModelName, id);
}

export function requestPoolsForProject(refModelName, id) {
    return requestSecondaryOptionsListAsync(types.options.OPTIONS_POOLS_FOR_PROJECT, "user_requests", refModelName, id);
}

export function requestSamplesForProject(refModelName, id) {
    return requestSecondaryOptionsListAsync(types.options.OPTIONS_SAMPLES_FOR_PROJECT, "samples", refModelName, id);
}

export function requestBasecallingsForRun(refModelName, id) {
    return requestSecondaryOptionsListAsync(types.options.OPTIONS_BASECALLINGS_FOR_RUN, "basecallings", refModelName, id);
}

/**
 * Apart from updating the form, which is not handled here, we need to shift secondaryOptions
 * so that they keep corresponding after remove one element in the libs array.
 */
export function removeLibFromRuns(laneNb, libIndex, nbLibs) {
    return {
        type: types.options.REMOVE_LIB_FROM_RUNS,
        laneNb,
        libIndex,
        nbLibs,
    };
}