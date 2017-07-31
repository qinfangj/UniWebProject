"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';

import AdminData from '../components/pages/AdminData';
import CommonAdminForms from '../components/forms/adminData/CommonAdminForms';




const wrapper1 = shallow(
    <AdminData title="Analysis Types" name="pipeline_analysis_types"  content={
        <CommonAdminForms table="pipeline_analysis_types"/>
    } />
);

describe('(AdminForms) AnalysisTypeNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper1).to.have.length(1);
    });
});

const wrapper2 = shallow(
    <AdminData title="Flowcell Types" name="flowcell_types" content={
        <CommonAdminForms table="flowcell_types"  />
    } />
);

describe('(AdminForms) FlowcellTypesNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper2).to.have.length(1);
    });
});

const wrapper3 = shallow(
    <AdminData title="Instruments" name="instruments" content={
        <CommonAdminForms table="instruments"  />
    } />
);

describe('(AdminForms) InstrumentsNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper3).to.have.length(1);
    });
});


const wrapper4 = shallow(
    <AdminData title="Library Adapter" name="library_adapters" content={
        <CommonAdminForms table="library_adapters" />
    } />
);

describe('(AdminForms) libAdaptersNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper4).to.have.length(1);
    });
});

const wrapper5 = shallow(
    <AdminData title="Library Protocols" name="lib_protocols" content={
        <CommonAdminForms table="lib_protocols" />
    } />
);

describe('(AdminForms) libProtocolsNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper5).to.have.length(1);
    });
});

const wrapper6 = shallow(
    <AdminData title="Library States" name="library_states" content={
        <CommonAdminForms table="library_states" />
    } />
);

describe('(AdminForms) libStatesNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper6).to.have.length(1);
    });
});

const wrapper7 = shallow(
    <AdminData title="Mapping Tools" name="mapping_tools" content={
        <CommonAdminForms table="mapping_tools" />
    } />
);

describe('(AdminForms) mappingToolsNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper7).to.have.length(1);
    });
});

const wrapper8 = shallow(
    <AdminData title="Multiplex Indexes" name="multiplex_indexes" content={
        <CommonAdminForms table="multiplex_indexes" />
    } />
);

describe('(AdminForms) MultiplexIndexesNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper8).to.have.length(1);
    });
});

const wrapper9 = shallow(
    <AdminData title="Pipeline Version" name="pipeline_versions" content={
        <CommonAdminForms table="pipeline_versions" />
    } />
);

describe('(AdminForms) PipelineVersionsNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper9).to.have.length(1);
    });
});

const wrapper10 = shallow(
    <AdminData title="Project Analysis" name="project_analysis" content={
        <CommonAdminForms table="project_analysis" />
    } />
);

describe('(AdminForms) ProjectAnalysisNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper10).to.have.length(1);
    });
});

const wrapper11 = shallow(
    <AdminData title="Project States" name="project_states" content={
        <CommonAdminForms table="project_states" />
    } />
);

describe('(AdminForms) ProjectStatesNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper11).to.have.length(1);
    });
});

const wrapper12 = shallow(
    <AdminData title="Quantification Methods" name="quantif_methods" content={
        <CommonAdminForms table="quantif_methods" />
    } />
);

describe('(AdminForms) QuantificationMethodsNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper12).to.have.length(1);
    });
});

const wrapper13 = shallow(
    <AdminData title="Read Lengths" name="read_lengths" content={
        <CommonAdminForms table="read_lengths" />
    } />
);

describe('(AdminForms) ReadLengthsNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper13).to.have.length(1);
    });
});

const wrapper14 = shallow(
    <AdminData title="Read Lengths" name="read_lengths" content={
        <CommonAdminForms table="read_lengths" />
    } />
);

describe('(AdminForms) ReadLengthsNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper14).to.have.length(1);
    });
});

const wrapper15 = shallow(
    <AdminData title="Run Types" name="run_types" content={
        <CommonAdminForms table="run_types" />
    } />
);

describe('(AdminForms) RunTypesNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper15).to.have.length(1);
    });
});

const wrapper16 = shallow(
    <AdminData title="Run Types Lengths" name="run_types_lengths" content={
        <CommonAdminForms table="run_types_lengths" />
    } />
);

describe('(AdminForms) RunTypesLengthsNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper16).to.have.length(1);
    });
});

const wrapper17 = shallow(
    <AdminData title="Sample Types" name="sample_types" content={
        <CommonAdminForms table="sample_types" />
    } />
);

describe('(AdminForms) SampleTypesNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper17).to.have.length(1);
    });
});

const wrapper18 = shallow(
    <AdminData title="Sequencing Kit Version" name="sequencing_kit_versions" content={
        <CommonAdminForms table="sequencing_kit_versions" />
    } />
);

describe('(AdminForms) SequenceingKitVersionsNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper18).to.have.length(1);
    });
});

const wrapper19 = shallow(
    <AdminData title="Sequencing Qualities" name="sequencing_qualities" content={
        <CommonAdminForms table="sequencing_qualities" />
    } />
);

describe('(AdminForms) SequenceingKQualitiesNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper19).to.have.length(1);
    });
});

const wrapper20 = shallow(
    <AdminData title="Taxonomies" name="taxonomies" content={
        <CommonAdminForms table="taxonomies" />
    } />
);

describe('(AdminForms) TaxonomiesNewPage =>', () => {

    it('renders without exploding', () => {
        expect(wrapper20).to.have.length(1);
    });
});