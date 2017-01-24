import React from 'react';
import css from '../components/forms/forms.css';
import * as forms from '../components/forms/forms.js';

import Button from 'react-bootstrap/lib/Button';



class CommonForm extends React.PureComponent {
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
        name: React.PropTypes.string.isRequired, // table name
        required: React.PropTypes.arrayOf(React.PropTypes.string), // required fields
        contents: React.PropTypes.oneOf(React.PropTypes.node, React.PropTypes.arrayOf(React.PropTypes.node)).isRequired,
        getFormValues: React.PropTypes.func.isRequired, // a function that returns the JSON object with form data to be sent
    };
    static defaultProps = {
        required: [],
    };

    onSubmit() {
        let formData = this.props.getFormValues();
        let newState = forms.submit(this.table, formData, this.props.required, null);
        this.setState(newState);
        newState.submissionFuture.done((insertId) => {
            this.setState({ submissionSuccess: true, submissionId: insertId });
        }).fail(() =>{
            console.warn("Uncaught form validation error");
            this.setState({ submissionError: true });
        });
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                {this.props.contents}

                <Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)} className={css.submitButton}>
                    Submit
                </Button>

            </form>
        );
    }
}


export default CommonForm;

