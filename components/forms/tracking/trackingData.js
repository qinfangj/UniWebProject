
let largeDataA =[];
for (let i = 0; i < 5; i++){
    largeDataA.push({
                         lab: "Ablasser ",
                         project: "CRISPR screen II - mmMacrophages",
                         data: "2017-04-26",
                         name: "aaa",
                         type: "total RNA",
                         comment: "aa"

                     });
}
//console.log(largeDataA);
const trackingData = {

    summaryData : {
        'MiSeq SR 150': largeDataA,
        'paired-end reads 100': [{code: '002'},{code: '003'},{code: '004'}],
        'single read 100': [{type: 'C01'},{type: 'C02'}],
        'classD': [{type: 'D01'},{type: 'D02'}]
    },
    detailData:{
        'MiSeq SR 150': [
            {
                id: 1,
                sample: {id:'22764',name:'ML3',Protocol:'Commercial',Date:'2016-08-23',index:'#iA_08',asLiberary:'yes',
                            project:'HCF Human',lab:'Herr',madeonRobot:'',facilityComment:'',
                            CustomerComment:'Diagenode Microplex library preparation Kit. No size selection. Fragment analyzer peak is not realiable because peak is very wide'},
                requests: [{ID:'25352',Sample:'ML3',Laboratory:'Herr',Libratory:'Commecial',
                                Runtype:'paried-end reads',LanesNb: '1',Mutiplex:'3',Group: 'group 1',Submitter: 'mlopes',
                                comment:'to be sequenced with library test_D2 which has Index N716/S510'},
                           {ID:'25353',Sample:'ML4',Laboratory:'Herr1',Libratory:'Commecial1',
                                Runtype:'paried-end reads',LanesNb: '1',Mutiplex:'3',Group: 'group 1',Submitter: 'mlopes',
                                comment:'to be sequenced with library test_D2 which has Index N716/S510'}]
            },
            {
                id: 2,
                sample: {id:'22765',name:'ML3',Protocol:'Commercial',date:'2016-08-23'},
                requests: [{id:'25354',sample:'ML3',laboratory:'Herr',libratory:'Commecial'},
                            {id:'25355',sample:'ML4',laboratory:'Herr1',libratory:'Commecial1'}]
            },
            {
                id: 3,
                sample: {id:'22766',name:'ML3',Protocol:'Commercial',date:'2016-08-23'},
                requests: [{id:'25356',sample:'ML3',laboratory:'Herr',libratory:'Commecial'},
                            {id:'25357',sample:'ML4',laboratory:'Herr1',libratory:'Commecial1'}]
            },
            {
                id: 4,
                sample: {id:'22767',name:'ML3',Protocol:'Commercial',date:'2016-08-23'},
                requests: [{id:'25358',sample:'ML3',laboratory:'Herr',libratory:'Commecial'},
                    {id:'25359',sample:'ML4',laboratory:'Herr1',libratory:'Commecial1'}]
            }
        ],
        'paired-end reads 100': [
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
        'single read 100': [
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
