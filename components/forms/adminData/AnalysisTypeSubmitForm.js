"use strict";
import React from 'react';
import css from '../forms.css';
import admincss from '../adminForm.css';
//import formNames from '../../constants/formNames';
import * as forms from '../forms.js';
import store from '../../../core/store';
import { insertAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import { Control, Form, actions} from 'react-redux-form';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import * as messages from '../messages';
import columns from '../../tables/columns';

var analysisTypes = columns["analysis_types"].slice(1);


// const aaa = {
//     "analysisType: {
//         "fields": {
//             "name": "comment",
//             "size": 3,
//             "label": "asdf"
//         },
//         model: "analysisType",
//             ...
//     },
// }

// <AnalysisTypeSubmitForm fields={aaa.analysisTpye.fields} model={aaa.analysisTpye.model} />
// fields = ["description","customerVIEWABLE",".","."]
// fields = [
// {name: "description", size: 3, label: ""asjdhfjkasd},
// {name: "customerVIEWABLE", size: 9},
// {name: ...
// ,".","."]

// let totalSize = 0
// columns = []
// for (i=0; i<fields.length; i++) {
//   field = fields[i];
//   totalSize += field.size
//   if (totalSize % 12 == 0) {
//      columns.push(<Col.../>)
//   }
//   columns.push(<Col.../>)
//}

// fields.map (field => {
//  return {
//<Col sm={field.size} className={css.formCol}>
//    <label>{field.label}</label>
//    <Control.text model={"."+field.name} disabled={!this.state.isInsert}/>
//</Col>
// }
// })
const adminData = {
    "analysisType": {
        "fields": [
            {
                "label": "Description",
                "name":  "description",
                "size":  3,
                "required": false
            },
            {
                "label": "Customer Viewable",
                "name":  "customer_viewable",
                "size":  3,
                "required": false
            },
            {
                "label": "UseAllReads",
                "name":  "useAllReads",
                "size":  6,
                "required": true
            },
            {
                "label": "Comment",
                "name":  "comment",
                "size":  12,
                "required": false
            }
        ],
        "model": "analysisTypeForm"
    }
};


class AnalysisTypeSubmitForm extends React.Component {
    constructor(props) {
        super(props);
        this.table = "pipeline_analysis_types";

        this.state = { 
            serverError: {}, 
            submissionError: false, 
            submissionSuccess: false, 
            submissionId: undefined, 
        };
        console.log("updateId=" + this.props.updateId)
        if (this.props.updateId ==='' || this.props.updateId ==undefined) {
            this.state.isInsert= true;
        }
        this.formModel = adminData.analysisType.model;
        this.fields= adminData.analysisType.fields;
        //const fields= _.map(object,function(s){ console.log( s.name)});

        console.log(this.fields);

        //this.update = window.location.hash includes 'update';

        //forms.initForm(this.deep.adminSubmitForm);
    }
    // componentWillMount() {
    //     this.validate = validate(this, analysisTypeModel);
    // }

    handleSubmit(values){
        let state = {serverError: {}};
        let formData = values;
        console.info(JSON.stringify(formData, null, 2));
        let fields = Object.keys(formData);
        console.log(fields);

        let future = store.dispatch(insertAsync(this.table, formData));
        state = Object.assign(state, {submissionError: false, submissionFuture: future});
        future
            .done((insertId) => console.debug(200, "Inserted ID <"+insertId+">"))
            .fail(() => console.warn("Uncaught form validation error"));

        let {submissionError, submissionFuture} =state
        if (submissionError) {
            this.setState({ submissionError, serverError: {} });
        } else {
            submissionFuture.done((insertId) => {
                this.setState({ submissionSuccess: true, submissionId: insertId, submissionError: false, serverError: {} });
            }).fail((err) =>{
                this.setState({ serverError: err, submissionError: false, submissionSuccess: false });
            });
        }

    }

    render() {
        //let values = this.props.values || {};  // values = {description: ""mycomment, viewable: true, ...}
        let formModel= "adminForms.";
        formModel=formModel.concat(this.formModel);
        //console.log("formModel=" + formModel);
        return (
            <Form model={formModel} className={css.form} onSubmit={(v) => console.log(v)}>
                <messages.SubmissionErrorMessage error={this.state.submissionError} /> 
                <messages.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} /> 
                <messages.ServerErrorMessage error={this.state.serverError} />
                {      this.fields.map((s)=> { 
                        return ( 
                            <Col sm={s.size} className={css.formCol} key={s.name}> 
                                <label className={admincss.label}>{s.label}:</label> 
                                <Control.text model={".".concat(s.name)}  disabled={!this.state.isInsert} className={admincss.input} required/> 
                            </Col> 
                        )}  )
                 }


 {/*                   <Col sm={6} className={css.formCol}>
                        <label className={admincss.label}>Description:</label>
                        <Control.text  model=".description" disabled={!this.state.isInsert} className={admincss.input} required/>
                    </Col>

                    <Col sm={3} className={css.formCol}>
                        <label className={admincss.label}>Customer Viewable:</label>
                        <Control.text model=".customerViewable" disabled={!this.state.isInsert} className={admincss.input}/>
                    </Col>

                    <Col sm={3} className={css.formCol}>
                        <label className={admincss.label}>UseAllReads:</label>
                        <Control.text model=".useAllReads" disabled={!this.state.isInsert} className={admincss.input} required/>
                    </Col>

                    <Col sm={12} className={css.formCol}>
                        <label className={admincss.label}>Comment:</label>
                        <Control.text model=".comment" disabled={!this.state.isInsert} className={admincss.input}/>
                    </Col>
*/}
                <Col sm={6} className={css.formCol}>
                    {this.state.isInsert ?
                <button type="submit"  className={admincss.button} style={{float:'right'}}>
                    Return
                </button>:''}
                </Col>
                <Col sm={6} className={css.formCol}>
                <button type="submit"  className={admincss.button} style={{float:'left'}}>
                    {this.state.isInsert ? 'Submit':'ActivateForm'}
                </button>
                </Col>
            </Form>
        );
    }
}

export default AnalysisTypeSubmitForm
