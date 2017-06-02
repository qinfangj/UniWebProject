'use strict';
import inputTypes from '../../forms/inputTypes';
import optionsStoreKeys from '../../constants/optionsStoreKeys';


const libraryModel = {
    "project": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PROJECTS_ALL,
        label: "Project",
    },
    "sampleName": {
        inputType: inputTypes.TEXT,
        label: "Sample name",
    },
    "shortName": {
        inputType: inputTypes.TEXT,
        label: "Short name",
    },
    "organism": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.TAXONOMIES,
        label: "Organism",
    },
    "startingMaterial": {
        inputType: inputTypes.TEXT,
        label: "Starting material",
    },
    "materialType": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.SAMPLE_TYPES,
        label: "Material type",
    },
    "libraryProtocol": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.LIB_PROTOCOLS,
        label: "Library protocol",
    },
    "adapters": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.LIB_ADAPTERS,
        label: "Adapters",
    },
    "libraryDate": {
        inputType: inputTypes.DATE,
        type: "date",
        label: "Library date",
    },
    "multiplexIndex7": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.MULTIPLEX_INDEXES,
        label: "Multiplex index (I7)",
    },
    "secondIndex5": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.MULTIPLEX_INDEXES,
        label: "Multiplex index (I5)",
    },
    "minFragSize": {
        inputType: inputTypes.NUMBER,
        label: "Min frag. size",
    },
    "maxFragSize": {
        inputType: inputTypes.NUMBER,
        label: "Max frag. size",
    },
    "bioanalyserPeak": {
        inputType: inputTypes.NUMBER,
        label: "Bioanalyser peak",
    },
    "concentration": {
        inputType: inputTypes.NUMBER,
        label: "Conc.[ng/μl]"
    },
    "volume": {
        inputType: inputTypes.NUMBER,
        label: "Vol.[μl]",
    },
    "quantifMethod": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.QUANTIF_METHODS,
        label: "Quantification",
    },
    "isrobotMade": {
        inputType: inputTypes.CHECKBOX,
        label: "Made on robot",
    },
    "comment": {
        inputType: inputTypes.TEXT,
        label: "Comment",
    },
    "sequencingType": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.RUN_TYPES_LENGTHS,
        label: "Sequencing type",
    },
    "nbLanes": {
        inputType: inputTypes.NUMBER,
        label: "Nb of lanes",
    },
    "multiplexNb": {
        inputType: inputTypes.NUMBER,
        label: "Multiplex#",
    },
    "multiplexingGroup": {
        inputType: inputTypes.TEXT,
        label: "Multiplexing group",
    },
};

export default libraryModel;

