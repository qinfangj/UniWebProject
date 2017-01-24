import React from 'react';
import store from '../../../core/store';

import { getSecondaryOptionsListAsync } from '../../actions/actionCreators/asyncActionCreators';
import dataStoreKeys from '../../constants/dataStoreKeys';
import formStoreKeys from '../../constants/formStoreKeys';
import MultipleSelect from '../elements/MultipleSelect';


class SamplesSecondaryMultipleSelect extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            options: []  // an array of objects of the type {id: .., name: ..}
        };
        this.table = "samples";
        this.dataStoreKey = dataStoreKeys.SAMPLES_FOR_PROJECTS;
        this.projectIds = null; // not in state because not used for display. Only the callback updates the component.
    }

    static propTypes = {
        referenceField: React.PropTypes.string.isRequired,  // the store key for the other input's form value, which should have been specified via `storeKey`!
        form: React.PropTypes.string.isRequired,  // form name
        formKey: React.PropTypes.string.isRequired,  // the store key for the selected values
        label: React.PropTypes.string,  // title on top of the input
        formatter: React.PropTypes.func,  // ex: object => [id, name]
        selectProps: React.PropTypes.object,  // other props to pass to the Select lower-level component
        filterByIds: React.PropTypes.any,  // set. keep only these ones
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let storeState = store.getState();
            let options = storeState.async[this.dataStoreKey];
            let formValues = storeState.common.forms[this.props.form];
            // Since it depends on another field of the same form, no need to
            //  do anything if the other field has not yet sent its value to the store.
            if (formValues !== undefined) {
                let referenceValue = formValues[this.props.referenceField];
                let projectIds = referenceValue ? Object.keys(referenceValue).join(",") : null;
                if ((! projectIds) || projectIds.length === 0) {
                    this.setState({ options: [] });
                }
                // The value it depends on changed, ask for new data
                else if (projectIds && projectIds !== this.projectIds) {
                    this.projectIds = projectIds;  // avoids infinite callback loop
                    store.dispatch(getSecondaryOptionsListAsync(this.table, projectIds, this.dataStoreKey));
                }
                // New data received, update options
                else if (options) {
                    this.setState({ options });
                }
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    /**
     * Filter and format options.
     */
    getOptions() {
        let options = this.filterOptions(this.state.options);
        return options.map(v => {
            return {id: v.id, name: v.short_name +" ("+ v.name +")", project_id: v.project_id};
        });
    }

    /**
     * Keep only options which id is in the set.
     */
    filterOptions(options) {
        let idsSet = this.props.filterByIds;
        if (idsSet === null) {
            return options;
        } else {
            return options.filter(v => idsSet.has(v.id));
        }
    }

    render() {
        return (
            <MultipleSelect
                name="samples_secondary_multiple_select"
                form={this.props.form}
                formKey={this.props.formKey}
                label={this.props.label}
                options={this.getOptions()}
            />
        );
    }
}


export default SamplesSecondaryMultipleSelect;