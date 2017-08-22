describe('User request New- HTML Web Form', function() {

    context('New user request HTML form submission', function() {
        beforeEach(function () {
            cy.login("test", "test")
        })

        it('visit user request new page', function(){
            cy.visit('/#/facility/user_requests/new')

            //input columns

            cy.get('input#nbLanes').type("4")

            //pull down columns
            cy.get('select#projectId').select('3')
            cy.get('select#sampleId').select('3')
            cy.get('select#libProtocolId').select('42')
            cy.get('select#runTypesLengthId').select('1')


            cy.get('button[type=submit]').click()
            //cy.wait(500)

            cy.url().should('include', '/user_requests/list')

        })

    })
})
