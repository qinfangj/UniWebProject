"use strict";
import actions from '../actionTypes';
import RestService from '../../../utils/RestService';
import { asyncAction } from './base';

export function trackingSummariesAsync(storeKey) {
    let args = {storeKey};
    return asyncAction(actions.tracking.TRACKING_SUMMARIES, RestService.trackingSummaries.bind(null, storeKey), args);
}
