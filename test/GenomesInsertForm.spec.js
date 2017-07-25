"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect,assert} from 'chai';

import store from '../core/store';
import { Provider } from 'react-redux';

import {GenomesInsertForm} from '../components/forms/facilityData/GenomesInsertForm';
import genomesModel from '../components/forms/facilityData/formModels/genomesModel';
import inputTypes from '../components/constants/inputTypes';


const wrapper = shallow(
    <Provider store={store}>
        <GenomesInsertForm/>
    </Provider>
);

describe('(Component) GenomesInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });

    let formModel = "genomes";
    let genomesInsertFormTestData = {
        "taxoId": 1,
        "assembly": "plkm34",
        "files": "files?",
        "downloadedDate": "2014-01-01",
        "genomeFolder": "/here",
    };

    let form = mount(
        <Provider store={store}>
            <GenomesInsertForm
                options={{
                    'MAPPING_TOOLS_OPTIONS':[[1, "Eland_v1"], [2, "Eland_v2"]],
                    'RUNS_OUTPUT_FOLDERS_OPTIONS': [[1, "100429_C3PO_0012_61FV9AAXX"], [2, "100422_R2D2_0078_613R6AAXX"]],
                    'PIPELINE_ANALYSIS_TYPES_OPTIONS': [[1, "Primary"], [2, "Secondary"]],
                }}
                requestTaxonomies={() => null}
            />
        </Provider>
    );

    it('should initially be invalid', () => {
        assert.isFalse(store.getState().facilityDataForms.forms[formModel].$form.validated);
    });

//let fieldsList = projectsModel[tableNames.FLOWCELL_TYPES].fields;

    it('GenomesInsertForm should be valid after only all fields made valid', () => {
        for (let modelName of Object.keys(genomesModel)) {
            let id = "#" + modelName;
            console.log(id);
            console.log(genomesInsertFormTestData[modelName]);
            if (genomesModel[modelName].inputType === inputTypes.TEXT) {
                form.find(id).node.value = genomesInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));
                let validity = store.getState().facilityDataForms.forms[formModel][modelName].validity;
                for (let i = 0; i < Object.keys(validity).length; i++) {
                    let key = Object.keys(validity)[i];
                    assert.isTrue(validity[key]);
                }
            }
            else if (genomesModel[modelName].inputType === inputTypes.DROPDOWN) {

                form.find(id).node.value = genomesInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));

                assert.isTrue(store.getState().facilityDataForms.forms[formModel][modelName].valid);
            }
        }
        assert.isTrue(store.getState().facilityDataForms.forms[formModel].$form.valid);

    });
});
