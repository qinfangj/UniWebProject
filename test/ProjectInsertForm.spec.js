"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect, assert} from 'chai';

import store from '../core/store';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ProjectsInsertForm } from '../components/forms/facilityData/ProjectsInsertForm';
import projectsModel from '../components/forms/facilityData/formModels/projectsModel';
import inputTypes from '../components/constants/inputTypes';



const wrapper = shallow(
    <Provider store={store}>
        <ProjectsInsertForm storeKey="something" />
    </Provider>
);

describe('(Component) ProjectsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});


// const mapStateToProps = (state) => {
//     let formData = state.facilityDataForms.projects;
//     let formModel = state.facilityDataForms.forms.projects;
//     return {
//         formData: formData,
//         formModel: formModel,
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         requestLaboratories: () => null,
//         requestProjectStates: () => null,
//         feedbackWarning: () => dispatch(feedbackWarning()),
//     }
// };
//
//
// let ConnectedProjectsInsertForm = connect(mapStateToProps, mapDispatchToProps)(ProjectsInsertForm);
//
//

let projectsInsertFormTestData = {
    "name": "newName", "personId": 1, "codeName": "thiscode_AA",
    "description": "this is testing data", "projectStateId": 1, "projectAnalysisId": "dddd"
};
let form = mount(
    <Provider store={store}>
        <ProjectsInsertForm
            options={{
                'LABORATORIES': [[1, "Stylianos"], [2, "Christian Beisel"]],
                'PROJECT_STATES_OPTIONS': [[1, "open"], [2, "closed"]],
                'PROJECT_ANALYSES_OPTIONS': [[1, "option1"], [2, "option2"]]
            }}
            requestLaboratories={() => null}
            requestProjectStates={() => null}
            requestProjectAnalyses={() => null}
        />
    </Provider>
);

it('should initially be invalid', () => {
    assert.isFalse(store.getState().facilityDataForms.forms["projects"].$form.validated);
});

//let fieldsList = projectsModel[tableNames.FLOWCELL_TYPES].fields;
let model = "facilityDataForms.projects";

it('ProjectInsertForm should be valid after only all fields made valid', () => {
    for (let modelName of Object.keys(projectsModel)) {
        let id = "#" + modelName;

        if (projectsModel[modelName].inputType === inputTypes.TEXT) {
            form.find(id).node.value = projectsInsertFormTestData[modelName];
            form.find(id).simulate('change', form.find(id));
            let validity = store.getState().facilityDataForms.forms["projects"][modelName].validity;
            for (let i = 0; i < Object.keys(validity).length; i++) {
                let key = Object.keys(validity)[i];
                assert.isTrue(validity[key]);
            }
        }
        else if (projectsModel[modelName].inputType === inputTypes.DROPDOWN) {

            form.find(id).node.value = projectsInsertFormTestData[modelName];
            form.find(id).simulate('change', form.find(id));

            assert.isTrue(store.getState().facilityDataForms.forms["projects"][modelName].valid);
        }
    }
    assert.isTrue(store.getState().facilityDataForms.forms["projects"].$form.valid);

});


