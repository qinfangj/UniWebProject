"use strict";
import types from '../actionTypes';
import RestService from '../../../utils/RestService';
import { asyncAction } from './base';


export function batchInsertAsync(tableName, formData) {
    let args = {tableName,};
    return asyncAction(types.userData.BATCH_INSERT, RestService.batchInsert.bind(null, tableName, formData), args);
}


