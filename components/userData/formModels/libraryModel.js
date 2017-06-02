'use strict';
import inputTypes from '../../forms/inputTypes';
import optionsStoreKeys from '../../constants/optionsStoreKeys';


const libraryModel = {
    "sampleName": {
        inputType: inputTypes.TEXT,
        label: "Sample name",
    },
    "shortName": {
        inputType: inputTypes.TEXT,
        label: "Short name",
    },
    "startingMaterial": {
        inputType: inputTypes.TEXT,
        label: "Starting material",
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
    "comment": {
        inputType: inputTypes.TEXT,
        label: "Comment",
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

