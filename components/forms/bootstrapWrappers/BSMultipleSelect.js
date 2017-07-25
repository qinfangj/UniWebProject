"use strict";
import React from 'react';
import store from '../../../core/store';
import PropTypes from 'prop-types';
import { makeLabel } from './bs';
import { FormGroup, FormControl } from 'react-bootstrap/lib';


const emptyArray = [];  // because of redux


/**
 * A BSSelect component with `multiple` attribute.
 */
class BSMultipleSelect extends React.PureComponent {

    static propTypes = {
        onSelectActionCreator: PropTypes.func,  // redux action creator, when another value is selected
        onResetActionCreator: PropTypes.func,  // redux action, when value "-1/any/none" is selected
    };

    render() {
        let {value, isRequired, options, label, hasNoneValue, ...inputProps} = this.props;
        let title = makeLabel(label, isRequired);

        // Need to cast to string because the 'value' prop of an <option> is always a string and will compare.
        value = value.map(v => ''+v) || emptyArray;

        // Turn [1, "a"]s into <option>s.
        let opts = options ? options.map((v,i) => {
            return <option value={v[0]} key={i}>{v[1]}</option>;
        }) : [];

        // Add the "-" default option.
        if (options && hasNoneValue) {
            opts.unshift(<option value="" key="-">{'-'}</option>);
        }

        return (
            <FormGroup bsSize="small" >
                {title}
                <FormControl
                    multiple
                    componentClass="select"
                    placeholder={label}
                    value={value}
                    {...inputProps}
                >
                    {opts}
                </FormControl>
            </FormGroup>
        );
    }
}


export default BSMultipleSelect;

