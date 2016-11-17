/**
 * Fetch the different options lists for Select inputs, e.g. all project states.
 * */


export function getAdapters() {
    return [];
}

export function getFlowcellVersions() {
    return [];
}

export function getInstruments() {
    return [];
}

export function getLibProtocols() {
    return [];
}

export function getLibrariesList() {  // should depend on project // _getSelLib / _getSelLibOpenProjects
    return [];
}

export function getLibraryPools() {  // should depend on project
    return [[1, "p1"], [2, "p2"]];
}

export function getLibraryStates() {
    return [];
}

export function getLibraryTypes() {
    return [];
}

export function getMultiplexIndexes() {
    return[];
}

export function getOrganismsList() {
    return [[1,"Human"], [2,"Mouse"], [3,"Fly"]];
    // DBIinsert::optiondisplaydbOrdered('taxonomies',['id','name'], ['name']);
}

export function getProjectsList() {
    return[[1, "Project1"], [2, "Project2"]];
}

export function getQuantifTypesList() {
    return [];
}

export function getRunRequests() {
    return [];
}

export function getRunTypesLengths() {
    return [];
}

export function getSamplesList() {
    return [];
}

export function getSampleTypesList() {
    return [[1, "type1"], [2, "type2"]];
}

export function getQualitiesList() {   // getSelQualities
    return [];
}

export function getSequencingKits() {
    return [];
}

export function getRunStages() {
    return [[1,'--'], [2,'A'], [3,'B']];
}


