"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect,assert} from 'chai';
import {BasecallingsInsertForm} from '../components/forms/facilityData/BasecallingsInsertForm';
import { feedbackWarning } from '../components/actions/actionCreators/feedbackActionCreators';
import basecallingsModel from '../components/forms/facilityData/formModels/basecallingsModel';
import inputTypes from '../components/forms/inputTypes';


const wrapper = shallow(
    <Provider store={store}>
        <BasecallingsInsertForm/>
    </Provider>
);

describe('(Component) BasecallingInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });

    let formModel = "basecallings";
    let basecallingsInsertFormTestData = {
        "runId": 1,
        "outputDir": "here/there",
        "analysisTypeId": 1,
        "isdemultiplexingAnalysis": true,
        "pipelineVersionId": 1
    };

    let form = mount(
        <Provider store={store}>
            <BasecallingsInsertForm
                options={{
                    'RUNS_OUTPUT_FOLDERS_OPTIONS':[[1, "100429_C3PO_0012_61FV9AAXX"], [2, "100422_R2D2_0078_613R6AAXX"]],
                    'PIPELINE_VERSIONS_OPTIONS': [[1, "Illumina pipeline - 1.84"], [2, "Illumina pipeline - 1.82"]],
                    'PIPELINE_ANALYSIS_TYPES_OPTIONS': [[1, "Primary"], [2, "Secondary"]],
                }}
                requestRunsOutputFolders={() => null}
                requestPipelineVersions={() => null}
                requestPipelineAnalysisTypes={() => null}
                feedbackWarning={() => store.dispatch(feedbackWarning())}
            />
        </Provider>
    );

    it('should initially be invalid', () => {
        assert.isFalse(store.getState().facilityDataForms.forms[formModel].$form.validated);
    });

//let fieldsList = projectsModel[tableNames.FLOWCELL_TYPES].fields;

    it('LibrariesInsertForm should be valid after only all fields made valid', () => {
        for (let modelName of Object.keys(basecallingsModel)) {
            let id = "#" + modelName;
            if (basecallingsModel[modelName].inputType === inputTypes.TEXT) {
                form.find(id).node.value = basecallingsInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));
                let validity = store.getState().facilityDataForms.forms[formModel][modelName].validity;
                for (let i = 0; i < Object.keys(validity).length; i++) {
                    let key = Object.keys(validity)[i];
                    assert.isTrue(validity[key]);
                }
            }
            else if (basecallingsModel[modelName].inputType === inputTypes.DROPDOWN) {

                form.find(id).node.value = basecallingsInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));

                assert.isTrue(store.getState().facilityDataForms.forms[formModel][modelName].valid);
            }
        }
        assert.isTrue(store.getState().facilityDataForms.forms[formModel].$form.valid);

    });
});
