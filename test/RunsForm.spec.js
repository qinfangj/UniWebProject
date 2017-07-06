"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';

import {expect,assert} from 'chai';
import {RunsInsertForm} from '../components/forms/facilityData/Runs/RunsInsertForm';
import { feedbackWarning } from '../components/actions/actionCreators/feedbackActionCreators';
import runsModel from '../components/forms/facilityData/formModels/runsModel';
import inputTypes from '../components/forms/inputTypes';

const wrapper1 = shallow(
    <Provider store={store}>
        <RunsInsertForm/>
    </Provider>
);
describe('(Component) RunsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper1).to.have.length(1);
    });

    let formModel = "runs";
    let runsInsertFormTestData = {
        "gaRunNb": 4000,
        "flowcellRefName": "XXXX",
        "flowcellTypeId": 1,
        "flowcellLoadingDate": "1970-01-01",
        "instrumentId": 2,
        "gaRunDate": "1970-01-01",
        "runTypesLengthId": 1,
        "fcStage": 1,
        "sequencingKitVersionId": 1,
        "istrashed": false,
        "comment": ""
    };

    let form = mount(
        <Provider store={store}>
            <RunsInsertForm
                options={{
                    'MAPPING_TOOLS_OPTIONS':[[1, "Eland_v1"], [2, "Eland_v2"]],
                    'RUNS_OUTPUT_FOLDERS_OPTIONS': [[1, "100429_C3PO_0012_61FV9AAXX"], [2, "100422_R2D2_0078_613R6AAXX"]],
                    'PIPELINE_ANALYSIS_TYPES_OPTIONS': [[1, "Primary"], [2, "Secondary"]],
                }}
                requestInstruments={() => null}
                requestFlowcellTypes={() => null}
                requestRunsTypesLengths={() => null}
                requestSequencingKitVersions={() => null}
                requestLibrariesForProject={() => null}
                feedbackWarning={() => store.dispatch(feedbackWarning())}
            />
        </Provider>
    );

    it('should initially be invalid', () => {
        assert.isFalse(store.getState().facilityDataForms.forms[formModel].$form.validated);
    });

//let fieldsList = projectsModel[tableNames.FLOWCELL_TYPES].fields;

    it('LibrariesInsertForm should be valid after only all fields made valid', () => {
        for (let modelName of Object.keys(runsModel)) {
            let id = "#" + modelName;
            console.log(id);
            console.log(runsInsertFormTestData[modelName]);
            if (runsModel[modelName].inputType === inputTypes.TEXT) {
                form.find(id).node.value = runsInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));
                let validity = store.getState().facilityDataForms.forms[formModel][modelName].validity;
                for (let i = 0; i < Object.keys(validity).length; i++) {
                    let key = Object.keys(validity)[i];
                    assert.isTrue(validity[key]);
                }
            }
            else if (runsModel[modelName].inputType === inputTypes.DROPDOWN) {

                form.find(id).node.value = runsInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));

                assert.isTrue(store.getState().facilityDataForms.forms[formModel][modelName].valid);
            }
        }
        assert.isTrue(store.getState().facilityDataForms.forms[formModel].$form.valid);

    });
});
