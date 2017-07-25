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
        // Don't pass unwanted props to <input/>
        // in particular `value` because for a multiple select, we need to pass `values`...
        //console.log(this.props.options)

        let {value, isRequired, options, label, hasNoneValue, ...inputProps} = this.props;
        let title = makeLabel(label, isRequired);

        value = value || emptyArray;

        // Turn [1, "a"]s into <option>s.
        let opts = options ? options.map((v,i) => {
            return <option value={v[0]} key={i} selected={value.indexOf(v[0]) >= 0}>{v[1]}</option>;
        }) : [];

        // Add the "-" default option.
        if (options && hasNoneValue) {
            opts.unshift(<option value="" key="-" selected={value.indexOf("") >= 0}>{'-'}</option>);
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

