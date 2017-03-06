/**
 * Created by christine on 02.03.17.
 */
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import {expect} from 'chai';
import LibrariesInsertFrom from '../components/forms/facilityData/LibrariesInsertForm';
//import RunsInsertFrom from '../../../components/forms/facilityData/Runs/RunsInsertForm';

import  TextField  from '../components/forms/elements/TextField';

describe('LibrariesInsertFrom =>', () => {
    it('should render a Todo component for each todo item', () => {
        const component = renderIntoDocument(
            <LibrariesInsertFrom/>
        );


        //const textFields = scryRenderedComponentsWithType(component, TextField);
        //expect(textFields.length).to.equal(5);



    });

});