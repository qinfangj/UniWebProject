"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect,assert} from 'chai';

import {LibrariesInsertForm} from '../components/forms/facilityData/LibrariesInsertForm';
import librariesModel from '../components/forms/facilityData/formModels/librariesModel';
import inputTypes from '../components/constants/inputTypes';


const wrapper = shallow(
    <Provider store={store}>
        <LibrariesInsertForm/>
    </Provider>
);

describe('(Component) LibrariesInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });

    let formModel = "libraries";
    let librariesInsertFormTestData = {
        "projectId": 1,
        "sampleId": 1,
        "name": "Lib1",
        "libProtocolId": 1,
        "libraryDate": "2016-01-01",
        "startingMaterial": "this",
        "bioanalyserPeak": 2,
        "fragSizeMin": 100,
        "fragSizeMax": 1000,
        "concentration": 3,
        "quantifMethodId": 1,
        "multiplexIndexId": 1,
        "index5primeId": 1,
        "adapterId": 1,
        "libraryStateId":1
    };

    let form = mount(
        <Provider store={store}>
            <LibrariesInsertForm
                options={{
                    'PROJECTS_HAVING_A_SAMPLE':[[1, "Antonarrakis - Metanoma sequencing"], [2, "Cole - M. lepraef"]],
                    'LIB_PROTOCOLS_OPTIONS': [[1, "16S gene"], [2, "C1 HT800"]],
                    'LIB_ADAPTERS_OPTIONS': [[1, "Custom"], [2, "Genomic"]],
                    'LIB_STATES_OPTIONS': [[1, "1 - Submitted"], [2, "2 - Ready"]],
                    'MULTIPLEX_INDEXES_OPTIONS': [[1, "Custom -"], [2, "No index - --"]],
                    'QUANTIF_METHODS_OPTIONS': [[1, "Nanodro"], [2, "Picogreen"]],
                }}
                requestProjectsHavingASample={() => null}
                requestLibProtocols={() => null}
                requestQuantifMethods={() => null}
                requestAllMultiplexIndexes={() => null}
                requestLibAdapters={() => null}
                requestLibraryStates={() => null}
                requestSamplesForProject={() => null}
            />
        </Provider>
    );

    it('should initially be invalid', () => {
        assert.isFalse(store.getState().facilityDataForms.forms[formModel].$form.validated);
    });

//let fieldsList = projectsModel[tableNames.FLOWCELL_TYPES].fields;

    it('LibrariesInsertForm should be valid after only all fields made valid', () => {
        for (let modelName of Object.keys(librariesModel)) {
            let id = "#" + modelName;
            if (librariesModel[modelName].inputType === inputTypes.TEXT) {
                form.find(id).node.value = librariesInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));
                let validity = store.getState().facilityDataForms.forms[formModel][modelName].validity;
                for (let i = 0; i < Object.keys(validity).length; i++) {
                    let key = Object.keys(validity)[i];
                    assert.isTrue(validity[key]);
                }
            }
            else if (librariesModel[modelName].inputType === inputTypes.DROPDOWN) {

                form.find(id).node.value = librariesInsertFormTestData[modelName];
                form.find(id).simulate('change', form.find(id));

                assert.isTrue(store.getState().facilityDataForms.forms[formModel][modelName].valid);
            }
        }
        assert.isTrue(store.getState().facilityDataForms.forms[formModel].$form.valid);

    });
});
