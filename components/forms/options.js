/**
 * Fetch the different options lists for Select inputs, e.g. all project states.
 * */


function getAdapters() {
    return [];
}

function getLibProtocols() {
    return [];
}

function getLibraryStates() {
    return [];
}

function getMultiplexIndexes() {
    return[];
}

function getOrganismsList() {
    return [[1,"Human"], [2,"Mouse"], [3,"Fly"]];
    // DBIinsert::optiondisplaydbOrdered('taxonomies',['id','name'], ['name']);
}

function getProjectsList() {
    return[];
}

function getProjectAnalysesList() {
    return [[1,"Analysis1"], [2,"Analysis2"], [3,"Analysis3"]];
    // optiondisplaydbOrdered($table, $args, $order, $limit): select * from table order by ..
    // DBIinsert::optiondisplaydbOrdered('project_analysis',['id','name' ], ['id']);
}

function getQuantifTypesList() {
    return [];
}

function getSamplesList() {
    return [];
}

function getSampleTypesList() {
    return [[1, "type1"], [2, "type2"]];
}


export {
    getAdapters,
    getLibProtocols,
    getLibraryStates,
    getMultiplexIndexes,
    getOrganismsList,
    getProjectAnalysesList,
    getProjectsList,
    getQuantifTypesList,
    getSamplesList,
    getSampleTypesList,
};