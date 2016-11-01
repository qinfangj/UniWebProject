import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './forms.css';
import store from '../../core/store';
import _ from 'lodash';

import { insertAsync } from '../actions/actionCreators/asyncActionCreators';

import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';



class GenericForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            missing: {},
            invalid: {},
            submissionError: false,
            submissionSuccessful: false,
        };
    }

    static propTypes = {
        table: React.PropTypes.string, // table name
        required: React.PropTypes.arrayOf(React.PropTypes.string), // required fields
        contents: React.PropTypes.oneOf(React.PropTypes.node, React.PropTypes.arrayOf(React.PropTypes.node)).isRequired,
        getFormValues: React.PropTypes.func.isRequired,
    };

    // componentWillMount() {
    //     this.unsubscribe = store.subscribe(() => {
    //         let data = store.getState().async[this.props.table];
    //     });
    // }

    /**
     * Close the error/success message window.
     */
    discardErrorMessage() {
        this.setState({submissionError: false, submissionSuccessful: false});
    }

    onSubmit() {
        let formData = this.props.getFormValues();
        console.info(JSON.stringify(formData, null, 2));
        let fields = Object.keys(formData);
        let nullFields = this.props.required.filter(k => formData[k] === null);
        let invalidFields = fields.filter(k => formData[k] === null);
        if (invalidFields.length !== 0) {
            let missing = _.zipObject(nullFields, new Array(nullFields.length).fill(true));
            let invalid = _.zipObject(invalidFields, new Array(invalidFields.length).fill(true));
            this.setState({missing, invalid, submissionError: true, submissionSuccessful: false});
        } else {
            console.debug(22)
            this.setState({missing: {}, invalid: {}, submissionError: false});
            let r = store.dispatch(insertAsync(this.props.table, formData));
            console.debug(r)
        }
    }

    render() {
        return (
            <form className={css.form}>

                {/* Error message */}

                {this.state.submissionError ?
                    <Alert bsStyle="warning" onClick={this.discardErrorMessage.bind(this)}>
                        Some required fields are missing or ill-formatted. Please review the form and submit again.
                        <span className={css.alertOk} onClick={this.discardErrorMessage.bind(this)}><a>OK</a></span>
                    </Alert>
                    : null}

                {this.state.submissionSuccessful ?
                    <Alert bsStyle="success" onClick={this.discardErrorMessage.bind(this)}>
                        Submission successful.
                        <span className={css.alertOk} onClick={this.discardErrorMessage.bind(this)}><a>OK</a></span>
                    </Alert>
                    : null}

                {this.props.contents}

                {/* Submit */}

                <Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)} className={css.submitButton}>
                    Submit
                </Button>

            </form>
        );
    }
}


export default GenericForm;

