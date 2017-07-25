"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect,assert} from 'chai';
import {UserRequestsInsertForm} from '../components/forms/facilityData/UserRequestsInsertForm';
import { feedbackWarning } from '../components/actions/actionCreators/feedbackActionCreators';
import userRequestsModel from '../components/forms/facilityData/formModels/userRequestsModel';
import inputTypes from '../components/constants/inputTypes';


const wrapper = shallow(
    <Provider store={store}>
        <UserRequestsInsertForm/>
    </Provider>
);

describe('(Component) UserRequestsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });

    let formModel = "user_requests";
    let userRequestsInsertFormTestData = {
        "projectId": 1,
        "sampleId": 1,
        "libProtocolId": 1,
        "runTypesLengthId": 1,
        "insertSizeMin": 1,
        "insertSizeMax": 10,
        "nbLanes": 12,
        "millionReads": 2,
    };

    let form = mount(
        <Provider store={store}>
            <UserRequestsInsertForm
                options={{
                    'LIB_PROTOCOLS_OPTIONS': [[1, "Antonarrakis - Metanoma sequencing"], [2, "Blanc - asdf"]],
                    'QUANTIF_METHODS_OPTIONS': [[1, "Nnodrop"], [2, "Picogreen"]],
                    'RUN_TYPE_LENGTHS_OPTIONS': [[1, "genomic DNA"], [2, "ChiP DNA"]],
                }}
                requestProjectsHavingASample={() => null}
                requestRunsTypesLengths={() => null}
                requestLibProtocols={() => null}
                requestSamplesForProject={() => null}
                feedbackWarning={() => store.dispatch(feedbackWarning())}
            />
        </Provider>
    );

    it('should initially be invalid', () => {
        assert.isFalse(store.getState().facilityDataForms.forms[formModel].$form.validated);
    });

//let fieldsList = projectsModel[tableNames.FLOWCELL_TYPES].fields

    it('UserRequestsInsertForm should be valid after only all fields made valid', () => {
        for (let modelName of Object.keys(userRequestsModel)) {
            let id = "#" + modelName;
            if (userRequestsModel[modelName].inputType === inputTypes.TEXT) {
                form.find(id).node.value = userRequestsInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));
                let validity = store.getState().facilityDataForms.forms[formModel][modelName].validity;
                for (let i = 0; i < Object.keys(validity).length; i++) {
                    let key = Object.keys(validity)[i];
                    assert.isTrue(validity[key]);
                }
            }
            else if (userRequestsModel[modelName].inputType === inputTypes.DROPDOWN) {

                form.find(id).node.value = userRequestsInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));

                assert.isTrue(store.getState().facilityDataForms.forms[formModel][modelName].valid);
            }
        }
        assert.isTrue(store.getState().facilityDataForms.forms[formModel].$form.valid);

    });
});
