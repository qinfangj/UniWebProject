
const ID_COLUMN = {
    headerName: "ID",
    field: "id",
    width: 40,
    suppressSizeToFit: true,
    suppressMenu: true,
    cellStyle: {textAlign: "center"},
};

const columns = {
    projects: [
        ID_COLUMN,
        {
            headerName: "Name",
            field: "name",
        },{
            headerName: "Code",
            field: "codeName",
        },{
            headerName: "Description",
            field: "description",
        },{
            headerName: "Author",
            field: "author",
        },
    ],
    people: [
        ID_COLUMN,
        {
            headerName: "PI name",
            field: "name",
        },{
            headerName: "Address",
            field: "address",
        },{
            headerName: "PI email",
            field: "email",
        }
    ],
    genomes: [
        ID_COLUMN,
        {
            headerName: "Organism",
            field: "organism",
        },{
            headerName: "Assembly",
            field: "assembly",
        },{
            headerName: "Masked",
            field: "is_masked",
        },{
            headerName: "Download date",
            field: "downloaded_date",
        },{
            headerName: "Folder",
            field: "genome_folder",
        },
    ],
    samples: [
        ID_COLUMN,
        {
            headerName: "Short name",
            field: "short_name",
        },{
            headerName: "Name",
            field: "name",
        },{
            headerName: "Received date",
            field: "received_date",
        },{
            headerName: "Type",
            field: "sample_type",
        },{
            headerName: "Organism",
            field: "organism",
        },{
            headerName: "Project",
            field: "project",
        },{
            headerName: "Lab",
            field: "laboratory",
        },
    ],
    libraries: [
        ID_COLUMN,
        {
            headerName: "Name",
            field: "name",
        },{
            headerName: "Protocol",
            field: "protocol",
        },{
            headerName: "Date",
            field: "library_date",
        },{
            headerName: "Index",
            field: "multiplex_index",
        },{
            headerName: "Submitted as library",
            field: "isCustomer_made",
        },{
            headerName: "Project",
            field: "project",
        },{
            headerName: "Laboratory",
            field: "laboratory",
        },{
            headerName: "Made on robot",
            field: "isRobot_made",
        },
    ],
};


export default columns;