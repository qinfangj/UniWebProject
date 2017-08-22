describe('Samples New- HTML Web Form', function() {

    context('New Samples HTML form submission', function() {
        beforeEach(function () {
            cy.login("test", "test")
        })

        it('visit samples new page', function(){
            cy.visit('/#/facility/samples/new')

            //input columns

            cy.get('input#name').type("sample1")
            cy.get('input#shortName').type("shortname1")
            cy.get('input#concentration').type("1")
            cy.get('input#volume').type("1")
            cy.get('input#ratio260280').type("260")
            cy.get('input#ratio260230').type("230")
            cy.get('input#description').type("description 1 2 3 ")
            cy.get('textarea#commentCustomer').type("customer comment")
            cy.get('input#comment').type("internal comment")
            //cy.get('#receivedDate').type('01-08-2017')


            //check box columns
            cy.get('input#istrashed').check()

            //pull down columns
            cy.get('select#projectId').select('52')
            cy.get('select#taxoId').select('2')
            cy.get('select#sampleTypeId').select('2')
            cy.get('select#quantifMethodId').select('2')


            cy.get('button[type=submit]').click()
            //cy.wait(500)

            cy.url().should('include', '/samples/list')

        })

    })
})
