import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';

import { getSecondaryOptionsListAsync } from '../../actions/actionCreators/asyncActionCreators';
import dataStoreKeys from '../../constants/dataStoreKeys';
import MultipleSelect from '../elements/MultipleSelect';


class SamplesSecondaryMultipleSelect extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            options: []
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
    };

    componentWillMount() {
        // Listen to store for changes
        this.unsubscribe = store.subscribe(() => {
            let storeState = store.getState();
            let options = storeState.async[this.dataStoreKey];
            let formValues = storeState.common.forms[this.props.form];
            // Since it depends on another field of the same form, no need to
            //  do anything if the other field has not yet sent its value to the store.
            if (formValues !== undefined) {
                let referenceValue = formValues[this.props.referenceField];
                let projectIds = referenceValue ? Object.keys(referenceValue).join(",") : null;
                // The value it depends on changed, ask for new data
                if (referenceValue && projectIds !== this.projectIds) {
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

    getOptions() {
        return this.state.options.map(v => [v.id, v.short_name +" ("+ v.name +")"]);
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