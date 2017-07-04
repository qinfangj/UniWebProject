"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';

import {expect} from 'chai';
import CommonTable from '../components/tables/CommonTable';
import tableNames from '../components/tables/tableNames';

const wrapper1 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey={tableNames.PROJECTS} table="projects" columnsKey="projects" />
    </Provider>
);

describe('(Table) Project =>', () => {
    it('renders without exploding', () => {
        expect(wrapper1).to.have.length(1);
    });
});

const wrapper2 = shallow(
    <Provider store={store}>
        <CommonTable activeOnly dataStoreKey={tableNames.PROJECTS_ACTIVE} table="projects" columnsKey="projects" />
    </Provider>
);

describe('(Table) ProjectActive =>', () => {
    it('renders without exploding', () => {
        expect(wrapper2).to.have.length(1);
    });
});

const wrapper3 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey={tableNames.PEOPLE} table="people" columnsKey="people" />
    </Provider>
);

describe('(Table) People =>', () => {
    it('renders without exploding', () => {
        expect(wrapper3).to.have.length(1);
    });
});

const wrapper4 = shallow(
    <Provider store={store}>
        <CommonTable activeOnly dataStoreKey={tableNames.PEOPLE_ACTIVE} table="people" columnsKey="people" />
    </Provider>
);

describe('(Table) PeopleActive =>', () => {
    it('renders without exploding', () => {
        expect(wrapper4).to.have.length(1);
    });
});

const wrapper5 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey={tableNames.GENOMES} table="genomes" columnsKey="genomes" />
    </Provider>
);

describe('(Table) Genomes =>', () => {
    it('renders without exploding', () => {
        expect(wrapper5).to.have.length(1);
    });
});

const wrapper6 = shallow(
    <Provider store={store}>
        <CommonTable activeOnly dataStoreKey={tableNames.GENOMES_ACTIVE} table="genomes" columnsKey="genomes" />
    </Provider>
);

describe('(Table) GenomesActive =>', () => {
    it('renders without exploding', () => {
        expect(wrapper6).to.have.length(1);
    });
});

const wrapper7 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey={tableNames.SAMPLES} table="samples" columnsKey="samples" />
    </Provider>
);

describe('(Table) Sample =>', () => {
    it('renders without exploding', () => {
        expect(wrapper7).to.have.length(1);
    });
});

const wrapper8 = shallow(
    <Provider store={store}>
        <CommonTable activeOnly dataStoreKey={tableNames.SAMPLES_ACTIVE} table="samples" columnsKey="samples" />
    </Provider>
);

describe('(Table) SamoleActive =>', () => {
    it('renders without exploding', () => {
        expect(wrapper8).to.have.length(1);
    });
});

const wrapper9 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey={tableNames.LIBRARIES} table="libraries" columnsKey="libraries" />
    </Provider>
);

describe('(Table) Libraries =>', () => {
    it('renders without exploding', () => {
        expect(wrapper9).to.have.length(1);
    });
});

const wrapper10 = shallow(
    <Provider store={store}>
        <CommonTable activeOnly dataStoreKey={tableNames.LIBRARIES_ACTIVE} table="libraries" columnsKey="libraries" />
    </Provider>
);

describe('(Table) LibrariesActive =>', () => {
    it('renders without exploding', () => {
        expect(wrapper10).to.have.length(1);
    });
});

const wrapper11 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey={tableNames.RUNS} table="runs" columnsKey="runs" />
    </Provider>
);

describe('(Table) Runs =>', () => {
    it('renders without exploding', () => {
        expect(wrapper11).to.have.length(1);
    });
});

const wrapper12 = shallow(
    <Provider store={store}>
        <CommonTable activeOnly dataStoreKey={tableNames.RUNS_ACTIVE} table="runs" columnsKey="runs" />
    </Provider>
);

describe('(Table) LibrariesActive =>', () => {
    it('renders without exploding', () => {
        expect(wrapper12).to.have.length(1);
    });
});

const wrapper13 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey={tableNames.USER_REQUESTS} table="user_requests" columnsKey="user_requests" />
    </Provider>
);

describe('(Table) UserRequest =>', () => {
    it('renders without exploding', () => {
        expect(wrapper13).to.have.length(1);
    });
});

const wrapper14 = shallow(
    <Provider store={store}>
        <CommonTable activeOnly dataStoreKey={tableNames.USER_REQUESTS_ACTIVE} table="user_requests" columnsKey="user_requests" />
    </Provider>
);

describe('(Table) UserRequestActive =>', () => {
    it('renders without exploding', () => {
        expect(wrapper14).to.have.length(1);
    });
});

const wrapper15 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey={tableNames.BIOANALYSERS} table="bioanalysers" columnsKey="bioanalysers" />
    </Provider>
);

describe('(Table) Bioanalyser =>', () => {
    it('renders without exploding', () => {
        expect(wrapper15).to.have.length(1);
    });
});

const wrapper16 = shallow(
    <Provider store={store}>
        <CommonTable activeOnly dataStoreKey={tableNames.BIOANALYSERS_ACTIVE} table="bioanalysers" columnsKey="bioanalysers" />
    </Provider>
);

describe('(Table) BioanalyserActive =>', () => {
    it('renders without exploding', () => {
        expect(wrapper16).to.have.length(1);
    });
});

const wrapper17 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey={tableNames.BASECALLINGS} table="basecallings" columnsKey="basecallings" />
    </Provider>
);

describe('(Table) Basecallings =>', () => {
    it('renders without exploding', () => {
        expect(wrapper17).to.have.length(1);
    });
});

const wrapper18 = shallow(
    <Provider store={store}>
        <CommonTable activeOnly dataStoreKey={tableNames.BASECALLINGS_ACTIVE} table="basecallings" columnsKey="basecallings" />
    </Provider>
);

describe('(Table) BasecallingsActive =>', () => {
    it('renders without exploding', () => {
        expect(wrapper18).to.have.length(1);
    });
});

const wrapper19 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey={tableNames.ALIGNMENTS} table="alignments" columnsKey="alignments" />
    </Provider>
);

describe('(Table) Alignments =>', () => {
    it('renders without exploding', () => {
        expect(wrapper19).to.have.length(1);
    });
});

const wrapper20 = shallow(
    <Provider store={store}>
        <CommonTable activeOnly dataStoreKey={tableNames.ALIGNMENTS_ACTIVE} table="alignments" columnsKey="alignments" />
    </Provider>
);

describe('(Table) AlignmentsActive =>', () => {
    it('renders without exploding', () => {
        expect(wrapper20).to.have.length(1);
    });
});

const wrapper21 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="users" table="users" columnsKey="users" />
    </Provider>
);

describe('(Table) Lims Users =>', () => {
    it('renders without exploding', () => {
        expect(wrapper21).to.have.length(1);
    });
});

const wrapper22 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="analysis_types" table="pipeline_analysis_types" columnsKey="analysis_types" />
    </Provider>
);

describe('(Table) Analysis Types =>', () => {
    it('renders without exploding', () => {
        expect(wrapper22).to.have.length(1);
    });
});


const wrapper23 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="flowcell_types" table="flowcell_types" columnsKey="flowcell_types" />
    </Provider>
);

describe('(Table) Flowcell Types =>', () => {
    it('renders without exploding', () => {
        expect(wrapper23).to.have.length(1);
    });
});

const wrapper24 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="instruments" table="instruments" columnsKey="instruments" />
    </Provider>
);

describe('(Table) Instruments =>', () => {
    it('renders without exploding', () => {
        expect(wrapper24).to.have.length(1);
    });
});


const wrapper25 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="library_adapters" table="library_adapters" columnsKey="library_adapters" />
    </Provider>
);

describe('(Table) Library Adapters =>', () => {
    it('renders without exploding', () => {
        expect(wrapper25).to.have.length(1);
    });
});

const wrapper26 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="lib_protocols" table="lib_protocols" columnsKey="lib_protocols" />
    </Provider>
);

describe('(Table) Library Protocols =>', () => {
    it('renders without exploding', () => {
        expect(wrapper26).to.have.length(1);
    });
});

const wrapper27 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="library_states" table="library_states" columnsKey="library_states" />
    </Provider>
);

describe('(Table) Library States =>', () => {
    it('renders without exploding', () => {
        expect(wrapper27).to.have.length(1);
    });
});

const wrapper28 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="mapping_tools" table="mapping_tools" columnsKey="mapping_tools" />
    </Provider>
);

describe('(Table) Mapping Tools =>', () => {
    it('renders without exploding', () => {
        expect(wrapper28).to.have.length(1);
    });
});

const wrapper29 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="multiplex_indexes" table="multiplex_indexes" columnsKey="multiplex_indexes" />
    </Provider>
);

describe('(Table) Multiplex Indexes =>', () => {
    it('renders without exploding', () => {
        expect(wrapper29).to.have.length(1);
    });
});

const wrapper30 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="pipeline_versions" table="pipeline_versions" columnsKey="pipeline_versions"  />
    </Provider>
);

describe('(Table) Pipeline Versions =>', () => {
    it('renders without exploding', () => {
        expect(wrapper30).to.have.length(1);
    });
});

const wrapper31 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="project_analysis" table="project_analysis" columnsKey="project_analysis"  />
    </Provider>
);

describe('(Table) Project Analysis =>', () => {
    it('renders without exploding', () => {
        expect(wrapper31).to.have.length(1);
    });
});

const wrapper32 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="project_states" table="project_states" columnsKey="project_states"  />
    </Provider>
);

describe('(Table) Project States =>', () => {
    it('renders without exploding', () => {
        expect(wrapper32).to.have.length(1);
    });
});

const wrapper33 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="quantif_methods" table="quantif_methods" columnsKey="quantif_methods"  />
    </Provider>
);

describe('(Table) Quantification Method =>', () => {
    it('renders without exploding', () => {
        expect(wrapper33).to.have.length(1);
    });
});

const wrapper34 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="run_types" table="run_types" columnsKey="run_types"  />
    </Provider>
);

describe('(Table) Run Type =>', () => {
    it('renders without exploding', () => {
        expect(wrapper34).to.have.length(1);
    });
});


const wrapper35 = shallow(
    <Provider store={store}>
        <CommonTable  dataStoreKey="run_types_lengths" table="run_types_lengths" columnsKey="run_types_lengths"   />
    </Provider>
);

describe('(Table) Run Type Length =>', () => {
    it('renders without exploding', () => {
        expect(wrapper35).to.have.length(1);
    });
});

const wrapper36 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="sample_types" table="sample_types" columnsKey="sample_types"   />
    </Provider>
);

describe('(Table) Sample Types =>', () => {
    it('renders without exploding', () => {
        expect(wrapper36).to.have.length(1);
    });
});

const wrapper37 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="sequencing_kit_versions" table="sequencing_kit_versions" columnsKey="sequencing_kit_versions"  />
    </Provider>
);

describe('(Table) Sequenceing Kit Version =>', () => {
    it('renders without exploding', () => {
        expect(wrapper37).to.have.length(1);
    });
});

const wrapper38 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="sequencing_qualities" table="sequencing_qualities" columnsKey="sequencing_qualities" />
    </Provider>
);

describe('(Table) Sequence Qualities =>', () => {
    it('renders without exploding', () => {
        expect(wrapper38).to.have.length(1);
    });
});

const wrapper39 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="taxonomies" table="taxonomies" columnsKey="taxonomies" />
    </Provider>
);

describe('(Table) Taxiomies =>', () => {
    it('renders without exploding', () => {
        expect(wrapper39).to.have.length(1);
    });
});

const wrapper40 = shallow(
    <Provider store={store}>
        <CommonTable dataStoreKey="project_sharings" table="project_sharings" columnsKey="project_sharings"  />
    </Provider>
);

describe('(Table) Project Sharings =>', () => {
    it('renders without exploding', () => {
        expect(wrapper40).to.have.length(1);
    });
});