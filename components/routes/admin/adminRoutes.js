"use strict";
import React from 'react';
import CommonTable from '../../tables/facilityData/CommonTable';
import AnalysisTypeSubmitForm from '../../forms/adminData/AnalysisTypeSubmitForm';



export class UserPage extends React.Component {

    render() {
        return (
            <div>Account page in construction</div>
        );
    }

}

export class AnalysisTypeNewPage extends React.Component {
    render() {
        return (
            <div>
                <AnalysisTypeSubmitForm updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="analysis_types" table="pipeline_analysis_types" columnsKey="analysis_types" />
                </div>
            </div>
        );
    }
}

export class AnalysisTypeUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <AnalysisTypeSubmitForm updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="analysis_types" table="pipeline_analysis_types" columnsKey="analysis_types" />
                </div>
            </div>
        );
    }
}