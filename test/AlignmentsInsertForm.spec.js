"use strict";
import React from 'react';

import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect, assert} from 'chai';
import {AlignmentsInsertForm} from '../components/forms/facilityData/AlignmentsInsertForm';
import { feedbackWarning } from '../components/actions/actionCreators/feedbackActionCreators';
import alignmentsModel from '../components/forms/facilityData/formModels/alignmentsModel';
import inputTypes from '../components/forms/inputTypes';

const wrapper = shallow(
    <Provider store={store}>
        <AlignmentsInsertForm/>
    </Provider>
);

describe('(Component) AlignmentsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
    let formModel = "alignments";
    let alignmentsInsertFormTestData = {
        "runId": 1,
        "basecallingId": 1,
        "mappingToolId": 1,
        "analysisTypeId": 1,
        "elandOutputDir": "folder",
    };

    let form = mount(
        <Provider store={store}>
            <AlignmentsInsertForm
                options={{
                    'MAPPING_TOOLS_OPTIONS':[[1, "Eland_v1"], [2, "Eland_v2"]],
                    'RUNS_OUTPUT_FOLDERS_OPTIONS': [[1, "100429_C3PO_0012_61FV9AAXX"], [2, "100422_R2D2_0078_613R6AAXX"]],
                    'PIPELINE_ANALYSIS_TYPES_OPTIONS': [[1, "Primary"], [2, "Secondary"]],
                }}
                requestPipelineAnalysisTypes={() => null}
                requestRunsOutputFolders={() => null}
                requestMappingTools={() => null}
                requestBasecallingsForRun={() => null}
                feedbackWarning={() => store.dispatch(feedbackWarning())}
            />
        </Provider>
    );

    it('should initially be invalid', () => {
        assert.isFalse(store.getState().facilityDataForms.forms[formModel].$form.validated);
    });

//let fieldsList = projectsModel[tableNames.FLOWCELL_TYPES].fields;

    it('LibrariesInsertForm should be valid after only all fields made valid', () => {
        for (let modelName of Object.keys(alignmentsModel)) {
            let id = "#" + modelName;
            if (alignmentsModel[modelName].inputType === inputTypes.TEXT) {
                form.find(id).node.value = alignmentsInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));
                let validity = store.getState().facilityDataForms.forms[formModel][modelName].validity;
                for (let i = 0; i < Object.keys(validity).length; i++) {
                    let key = Object.keys(validity)[i];
                    assert.isTrue(validity[key]);
                }
            }
            else if (alignmentsModel[modelName].inputType === inputTypes.DROPDOWN) {

                form.find(id).node.value = alignmentsInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));

                assert.isTrue(store.getState().facilityDataForms.forms[formModel][modelName].valid);
            }
        }
        assert.isTrue(store.getState().facilityDataForms.forms[formModel].$form.valid);

    });
});
