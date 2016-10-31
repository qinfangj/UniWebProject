
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
        ID_COLUMN
        ,{
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
        ID_COLUMN
        ,{
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
    ]
};


export default columns;