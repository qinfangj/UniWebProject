
let largeDataA =[];
for (let i = 0; i < 1000; i++){
    largeDataA.push({id: i});
}
//console.log(largeDataA);
const trackingData = {

    summaryData : {
        'classA': largeDataA,
        'classB': [{code: '002'},{code: '003'},{code: '004'}],
        'classC': [{type: 'C01'},{type: 'C02'}],
        'classD': [{type: 'D01'},{type: 'D02'}]
    },
    detailData:{
        'classA': [
            {
                id: 1,
                contents: ["Push successful","Push successful"]
            },
            {
                id: 2,
                contents: ["Plugin Updates","Plugin Updates","Plugin Updates","Plugin Updates"]
            },
            {
                id: 3,
                contents: ["Git Pull Failed","Git Pull Failed","Git Pull Failed","Git Pull Failed"]
            },
            {
                id: 4,
                contents: ["Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
                    "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch"]
            }
        ],
        'classB': [
            {
                code: '002',
                contents: ["AAAAAAAAAAAAAAA","BBBBBBBBBBBBB"]
            },
            {
                code: '003',
                contents: ["DDDDDDDDDD","FFFFFFFFFF","EEEEEEEEEE","GGGGGGGGGGGG"]
            },
            {
                code: '004',
                contents: ["HHHHHHHHHHHH","LLLLLLLLLLLL","MMMMMMMMMMMM","KKKKKKKKKKKKKKK"]
            },
        ],
        'classC': [
            {
                type: 'C01',
                contents: ["AAAAAAAAAAAAAAA","BBBBBBBBBBBBB"]
            },
            {
                type: 'C02',
                contents: ["DDDDDDDDDD","FFFFFFFFFF","EEEEEEEEEE","GGGGGGGGGGGG"]
            },
        ],
        'classD': [
            {
                type: 'D01',
                contents: ["GADSFSFSDFSDFS","SDFSDFASDFAS"]
            },
            {
                type: 'D02',
                contents: ["dfsadfasdaf","DFDSFSFS","dfssdfsa","sdfsdsf"]
            },

        ]
    }

};

export default trackingData;
