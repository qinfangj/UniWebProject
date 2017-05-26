"use strict";
import React from 'react';
import store from '../../core/store';
import { connect } from 'react-redux';
import { Form, Control, actions } from 'react-redux-form';
import { bindActionCreators } from 'redux';
import {
    requestAllProjects,
    requestTaxonomies,
    requestSampleTypes,
    requestQuantifMethods,
    } from '../actions/actionCreators/optionsActionCreators';
import optionsStoreKeys from '../constants/optionsStoreKeys';


class SamplesBatchSubmission extends React.PureComponent {

    componentWillMount() {
        this.props.requestAllProjects();
        this.props.requestTaxonomies();
        this.props.requestSampleTypes();
        this.props.requestQuantifMethods();
        store.dispatch(actions.change("userData.samples.project", "B"))
    }

    handleSubmit() {

    }

    makeOptions(options) {
        return options ? options.map((v,i) => <option value={v[0]} key={i}>{v[1]}</option>) : [];
    }

//Starting material description (e.g.: 'Crosslinked ChIP DNA from NIH-3T3 cells')

    render() {
        let options = this.props.options;

        return (
            <Form model="userData.samples">
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
                            <td>
                                <Control.select model="userData.samples.project">
                                    {this.makeOptions(options.projects)}
                                </Control.select>
                            </td>
                            <td>
                                <Control.text model="userData.samples.sampleName"/>
                            </td>
                            <td>
                                <Control.text model="userData.samples.shortName"/>
                            </td>
                            <td>
                                <Control.select model="userData.samples.organism">
                                    {this.makeOptions(options.organisms)}
                                </Control.select>
                            </td>
                            <td>
                                <Control.text model="userData.samples.startingMaterial"/>
                            </td>
                            <td>
                                <Control.select model="userData.samples.materialType">
                                    {this.makeOptions(options.sampleTypes)}
                                </Control.select>
                            </td>
                            <td>
                                <Control.text model="userData.samples.libraryProtocol"/>
                            </td>
                            <td>
                                <Control.text model="userData.samples.adapters"/>
                            </td>
                            <td>
                                <Control.input type="date" model="userData.samples.libraryDate"/>
                            </td>
                            <td>
                                <Control.text model="userData.samples.multiplexIndex7"/>
                            </td>
                            <td>
                                <Control.text model="userData.samples.secondIndex5"/>
                            </td>
                            <td>
                                <Control.input type="number" model="userData.samples.minFragSize"/>
                            </td>
                            <td>
                                <Control.input type="number" model="userData.samples.maxFragSize"/>
                            </td>
                            <td>
                                <Control.input type="number" model="userData.samples.bioanalyserPeak"/>
                            </td>
                            <td>
                                <Control.input type="number" model="userData.samples.concentration"/>
                            </td>
                            <td>
                                <Control.input type="number" model="userData.samples.volume"/>
                            </td>
                            <td>
                                <Control.select model="userData.samples.quantifMethod">
                                    {this.makeOptions(options.quantifMethods)}
                                </Control.select>
                            </td>
                            <td>
                                <Control.checkbox model="userData.samples.isrobotMade"/>
                            </td>
                            <td>
                                <Control.text model="userData.samples.comment"/>
                            </td>
                            <td>
                                <Control.text model="userData.samples.readTypesLengths"/>
                            </td>
                            <td>
                                <Control.input type="number" model="userData.samples.nbLanes"/>
                            </td>
                            <td>
                                <Control.input type="number" model="userData.samples.multiplexNb"/>
                            </td>
                            <td>
                                <Control.text model="userData.samples.multiplexingGroup"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        );
    }
}


function mapStateToProps(state) {
    let options = {
        projects: state.options[optionsStoreKeys.PROJECTS_ALL],
        organisms: state.options[optionsStoreKeys.TAXONOMIES],
        sampleTypes: state.options[optionsStoreKeys.SAMPLE_TYPES],
        quantifMethods: state.options[optionsStoreKeys.QUANTIF_METHODS],
    };
    return {
        options: options,
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

