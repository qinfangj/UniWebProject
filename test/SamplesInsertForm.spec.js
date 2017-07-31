"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect,assert} from 'chai';

import {SamplesInsertForm} from '../components/forms/facilityData/SamplesInsertForm';
import samplesModel from '../components/forms/facilityData/formModels/samplesModel';
import inputTypes from '../components/constants/inputTypes';



const wrapper = shallow(
    <Provider store={store}>
        <SamplesInsertForm/>
    </Provider>
);

describe('(Component) SamplesInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });

    let formModel = "samples";
    let sampleInsertFormTestData = {
        "name": "sample1",
        "shortName": "asdf",
        "projectId": 1,
        "taxoId": 1,
        "sampleTypeId": 1,
        "quantifMethodId": 1,
        "concentration": 231,
        "volume": 123,
        "rin": 123,
        "description": "this is a testing data",
    };

    let form = mount(
        <Provider store={store}>
            <SamplesInsertForm
                options={{
                    'PROJECT_ALL': [[1, "Antonarrakis - Metanoma sequencing"], [2, "Blanc - asdf"]],
                    'QUANTIF_METHODS_OPTIONS': [[1, "Nnodrop"], [2, "Picogreen"]],
                    'SAMPLE_TYPES_OPTIONS': [[1, "genomic DNA"], [2, "ChiP DNA"]],
                    'TAXONOMIES_OPTIONS': [[1, "Acomys dimidiatus (spiny mouse)"], [2, "All known viral genomes"]]
                }}
                requestAllProjects={() => null}
                requestTaxonomies={() => null}
                requestSampleTypes={() => null}
                requestQuantifMethods={() => null}
            />
        </Provider>
    );

    it('should initially be invalid', () => {
        assert.isFalse(store.getState().facilityDataForms.forms["samples"].$form.validated);
    });

//let fieldsList = projectsModel[tableNames.FLOWCELL_TYPES].fields;

    it('SamplesInsertForm should be valid after only all fields made valid', () => {
        for (let modelName of Object.keys(samplesModel)) {
            let id = "#" + modelName;

            if (samplesModel[modelName].inputType === inputTypes.TEXT) {
                form.find(id).node.value = sampleInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));
                let validity = store.getState().facilityDataForms.forms[formModel][modelName].validity;
                for (let i = 0; i < Object.keys(validity).length; i++) {
                    let key = Object.keys(validity)[i];
                        assert.isTrue(validity[key]);
                }
            }
            else if (samplesModel[modelName].inputType === inputTypes.DROPDOWN) {

                form.find(id).node.value = sampleInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));

                assert.isTrue(store.getState().facilityDataForms.forms[formModel][modelName].valid);
            }
        }
        assert.isTrue(store.getState().facilityDataForms.forms[formModel].$form.valid);

    });
});





