"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    requestAllProjects,
    requestTaxonomies,
    requestSampleTypes,
    requestQuantifMethods,
    } from '../actions/actionCreators/optionsActionCreators';


class SamplesBatchSubmission extends React.PureComponent {

    componentWillMount() {
        this.props.requestAllProjects();
        this.props.requestTaxonomies();
        this.props.requestSampleTypes();
        this.props.requestQuantifMethods();
    }

//Starting material description (e.g.: 'Crosslinked ChIP DNA from NIH-3T3 cells')

    render() {
        return (
            <div>
            ......

                <table>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Sample name</th>
                            <th>Short name</th>
                            <th>Organism</th>
                            <th>Starting material description</th>
                            <th>Material type</th>
                            <th>Library protocol</th>
                            <th>Adapters</th>
                            <th>Library date</th>
                            <th>Multiplex index (I7)</th>
                            <th>Second index (I5)</th>
                            <th>Min frag. size</th>
                            <th>Max frag. size</th>
                            <th>Bioan. peak</th>
                            <th>Conc.[ng/μl]</th>
                            <th>Vol.[μl]</th>
                            <th>Quantification</th>
                            <th>Made on robot</th>
                            <th>Comment</th>
                            <th>Sequencing type and Read length</th>
                            <th>Nb of lanes</th>
                            <th>Multiplex#</th>
                            <th>Multiplexing group</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        requestAllProjects,
        requestTaxonomies,
        requestSampleTypes,
        requestQuantifMethods,
        }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SamplesBatchSubmission);

