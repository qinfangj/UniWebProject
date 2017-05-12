"use strict";
import actionTypes from '../actionTypes';
import constants from '../../constants/constants';
import returnList from './base';

const types = actionTypes.tracking;

const defaultState = {
};

let trackingReducers = (state = defaultState, action) => {

    switch (action.type) {

        /* Get tracking summaries */
        case types.TRACKING_SUMMARIES:
            return returnList(action, state, action.args.storeKey, []);
        default:
            return state;

    }

};

export default trackingReducers;
