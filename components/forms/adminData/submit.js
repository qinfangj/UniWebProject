"use strict";

import { insertAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import store from '../../../core/store';
import adminData from './adminDataModels';
import { dateNow, parseDateString } from '../../../utils/time';
import { withRouter } from 'react-router';


//Format adminFormData as the adminFormConstants defined before submission
export function formatFormData(formData, table) {

    Object.keys(formData).forEach(function (key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object

        if (adminData[table].fields[index]) {
            if (adminData[table].fields[index].type === "Int") {
                formData[key] = parseInt(formData[key]);
            } else if (adminData[table].fields[index].type === "Boolean") {
                formData[key] = !!parseInt(formData[key]);
            }
        }
    });

    if (formData.id && formData.id !== 0) {
        formData.updatedAt = dateNow();
        if (formData.createdAt) {
            formData.createdAt = parseDateString(formData.createdAt);
        }
    }

    console.log(formData);
    return formData
}

export function submit(component, values, table, updateId, isInsert) {

    let state = {serverError: {}};

    let data = Object.assign({}, values);

    console.info(JSON.stringify(data, null, 2));

    if (!isInsert) {
        component.setState({isInsert:true});
    } else {
        let formData = formatFormData(data, table);
        let future = store.dispatch(insertAsync(table, formData));
        state = Object.assign(state, {submissionError: false, submissionFuture: future});
        future
            .done((insertId) => console.debug(200, "Inserted ID <" + insertId + ">"))
            .fail(() => console.warn("Uncaught form validation error"));

        let {submissionError, submissionFuture} =state;
        if (submissionError) {
            component.setState({submissionError, serverError: {}});
        } else {
            submissionFuture.done((insertId) => {
                component.setState({
                    submissionSuccess: true,
                    submissionId: insertId,
                    submissionError: false,
                    serverError: {}
                });
                let currentPath = window.location.pathname + window.location.hash.substr(2);
                if (updateId === '' || updateId === undefined) {
                    component.props.router.push(currentPath.replace('/new', '/list'));

                }else {
                    component.props.router.push(currentPath.replace('/update/'+ updateId, '/list'));

                }
            }).fail((err) => {
                component.setState({serverError: err, submissionError: false, submissionSuccess: false});
            });
        }
    }

}
