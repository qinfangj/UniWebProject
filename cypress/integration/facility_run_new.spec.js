describe('Run New- HTML Web Form', function() {

    context('New Run HTML form submission', function() {
        beforeEach(function () {
            cy.login("test", "test")
        })

        it('visit user run new page', function(){
            cy.visit('/#/facility/runs/new')

            //input columns
            cy.get('input#gaRunNb').type("2")
            cy.get('input#flowcellRefName').type("flowcell2")

            //pull down columns
            cy.get('select#flowcellTypeId').select('1')
            cy.get('select#instrumentId').select('2')
            cy.get('select#runTypesLengthId').select('1')
            cy.get('select#sequencingKitVersionId').select('1')
            cy.get('select#sequencingKitVersionId').select('1')

            cy.get('select[name="facilityDataForms.runs.lanes[1].libs[0].projectId"]').select('707')
            cy.get('select[name="facilityDataForms.runs.lanes[1].libs[0].libraryId"]').select('26580')


            cy.get('button[type=submit]').click()
            //cy.wait(500)

            cy.url().should('include', '/runs/list')

        })

    })
})

