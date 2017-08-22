describe('Basecalllings - HTML Web Form', function() {

    context('New Basecallings HTML form submission', function() {
        beforeEach(function () {
            cy.login("test", "test")
        })

        it('visit basecallings new page', function(){
            cy.visit('/#/facility/basecallings/new')

            //pull down columns
            cy.get('select#runId').select("1076")
            cy.get('select#pipelineVersionId').select("1")
            cy.get('select#analysisTypeId').select("1")

            //input columns
            cy.get('input#outputDir').type('Data/Intensities/Bustard1.5.0_05-10-2009_sbsuser/GERALD_05-10-2009_sbsuser')


            cy.get('button[type=submit]').click()

            cy.url().should('include', '/basecallings/list')

        })

    })
})
